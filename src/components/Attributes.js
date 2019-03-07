import React from 'react';
import PropTypes from 'prop-types';
import RankedTrait from './RankedTrait';
import Focus from './Focus';
import Section from './Section';
import {
  attributeTraitNames,
  attributeMaxDots,
  attributesRankDots
} from '../constants/characterOptions';

export default function Attributes({
  attributes,
  attributeBonus,
  foci,
  setRank,
  setFocus,
  purchaseOrUnpurchaseDot
}) {
  const handleRankChange = (trait, dotsFromRank) => {
    setRank('attributes', trait, dotsFromRank);
  };

  const handleFocusChange = (attribute, focus) => {
    setFocus(attribute, focus);
  };

  const handleOnClick = trait => {
    purchaseOrUnpurchaseDot('attributes', trait);
  };

  const traits = attributeTraitNames.map(name => (
    <div key={name} className="col-sm-4">
      <RankedTrait
        name={name}
        maxDots={attributeMaxDots}
        rankDots={attributesRankDots}
        traitState={attributes[name]}
        onRankChange={handleRankChange}
        onClick={handleOnClick}
      />
      <Focus
        attribute={name}
        foci={foci[name]}
        value={attributes[name].focus}
        onChange={handleFocusChange}
      />
    </div>
  ));

  return (
    <Section
      header="Attributes"
      footer={
        <React.Fragment>Attribute Bonus: {attributeBonus}</React.Fragment>
      }
    >
      <div className="row">{traits}</div>
    </Section>
  );
}

Attributes.propTypes = {
  attributes: PropTypes.object.isRequired,
  attributeBonus: PropTypes.number.isRequired,
  foci: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  setRank: PropTypes.func.isRequired,
  setFocus: PropTypes.func.isRequired,
  purchaseOrUnpurchaseDot: PropTypes.func.isRequired
};
