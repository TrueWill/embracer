import React from 'react';
import type { AttributesState } from '../types';
import RankedTrait from './RankedTrait';
import Focus from './Focus';
import Section from './Section';
import {
  attributeTraitNames,
  attributeMaxDots,
  attributesRankDots
} from '../constants/characterOptions';

interface AttributesProps {
  attributes: AttributesState;
  attributeBonus: number;
  foci: { [key: string]: string[] };
  setRank: (category: string, trait: string, dotsFromRank: number) => void;
  setFocus: (attribute: string, focus: string) => void;
  purchaseOrUnpurchaseDot: (category: string, trait: string) => void;
}

export default function Attributes({
  attributes,
  attributeBonus,
  foci,
  setRank,
  setFocus,
  purchaseOrUnpurchaseDot
}: AttributesProps) {
  const handleRankChange = (trait: string, dotsFromRank: number) => {
    setRank('attributes', trait, dotsFromRank);
  };

  const handleFocusChange = (attribute: string, focus: string) => {
    setFocus(attribute, focus);
  };

  const handleOnClick = (trait: string) => {
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
