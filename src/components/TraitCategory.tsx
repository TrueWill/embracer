import React from 'react';
import type { AvailableStartingDot, TraitState } from '../types';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import { standardTraitMaxDots } from '../constants/characterOptions';
import Trait from './Trait';
import Section from './Section';
import chunk from 'lodash.chunk';

interface TraitCategoryState {
  [traitName: string]: TraitState | AvailableStartingDot[];
  availableStartingDots: AvailableStartingDot[];
}

interface TraitCategoryProps {
  categoryName: string;
  traitNames: string[];
  specificNames?: string[];
  traitDisplayNameOverride: { [key: string]: string };
  categoryTraits: TraitCategoryState;
  adjustAvailable: (
    availableStartingDots: AvailableStartingDot[],
    traitName: string,
    dotsPurchased: number
  ) => AvailableStartingDot[];
  setStartingDots: (category: string, trait: string, startingDots: number) => void;
  purchaseOrUnpurchaseDot: (category: string, trait: string) => void;
}

export default function TraitCategory({
  categoryName,
  traitNames,
  specificNames,
  traitDisplayNameOverride,
  categoryTraits,
  adjustAvailable,
  setStartingDots,
  purchaseOrUnpurchaseDot
}: TraitCategoryProps) {
  const handleStartingDotsChange = (trait: string, startingDots: number) => {
    setStartingDots(categoryName, trait, startingDots);
  };

  const handleOnClick = (trait: string) => {
    purchaseOrUnpurchaseDot(categoryName, trait);
  };

  const allTraitNames =
    specificNames && specificNames.length
      ? traitNames.concat(specificNames)
      : traitNames;

  const traits = allTraitNames.map(name => {
    const traitState = (categoryTraits[name] as TraitState) || {};

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
