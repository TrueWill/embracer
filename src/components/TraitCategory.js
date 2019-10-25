import React from 'react';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import { standardTraitMaxDots } from '../constants/characterOptions';
import Trait from './Trait';
import Section from './Section';
import chunk from 'lodash.chunk';

export default function TraitCategory({
  categoryName,
  traitNames,
  specificNames,
  traitDisplayNameOverride,
  categoryTraits,
  adjustAvailable,
  setStartingDots,
  purchaseOrUnpurchaseDot
}) {
  const handleStartingDotsChange = (trait, startingDots) => {
    setStartingDots(categoryName, trait, startingDots);
  };

  const handleOnClick = trait => {
    purchaseOrUnpurchaseDot(categoryName, trait);
  };

  const allTraitNames =
    specificNames && specificNames.length
      ? traitNames.concat(specificNames)
      : traitNames;

  const traits = allTraitNames.map(name => {
    const traitState = categoryTraits[name] || {};

    const availableStartingDots = adjustAvailable(
      categoryTraits.availableStartingDots,
      name,
      traitState.dotsPurchased || 0
    );

    return (
      <Trait
        key={name}
        name={name}
        displayName={traitDisplayNameOverride[name]}
        maxDots={standardTraitMaxDots}
        availableStartingDots={availableStartingDots}
        traitState={traitState}
        onStartingDotsChange={handleStartingDotsChange}
        onClick={handleOnClick}
      />
    );
  });

  const traitsPerColumn = 9;
  const traitsByColumn = chunk(traits, traitsPerColumn);
  const columnCount = traitsByColumn.length;
  const pageGridWidth = 12;
  const columnGridWidth = pageGridWidth / columnCount;
  const className = `col-sm-${columnGridWidth}`;

  const columns = traitsByColumn.map((column, index) => (
    <div key={index} className={className}>
      {column}
    </div>
  ));

  return (
    <Section header={capitalizeFirstLetter(categoryName)}>
      <div className="row">{columns}</div>
    </Section>
  );
}

TraitCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
  traitNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  specificNames: PropTypes.arrayOf(PropTypes.string),
  traitDisplayNameOverride: PropTypes.object.isRequired,
  categoryTraits: PropTypes.object.isRequired,
  adjustAvailable: PropTypes.func.isRequired,
  setStartingDots: PropTypes.func.isRequired,
  purchaseOrUnpurchaseDot: PropTypes.func.isRequired
};
