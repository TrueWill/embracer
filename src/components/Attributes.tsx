import React from 'react';
import RankedTrait from './RankedTrait';
import Focus from './Focus';
import Section from './Section';
import {
  attributeTraitNames,
  attributeMaxDots,
  attributesRankDots
} from '../constants/characterOptions';
import { Foci, TraitState } from '../types';

interface AttributesProps {
  attributes: Record<string, TraitState>;
  attributeBonus: number;
  foci: Foci;
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
}: AttributesProps): JSX.Element {
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
        foci={foci[name as 'physical' | 'social' | 'mental']}
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
