import React from 'react';
import type { AvailableStartingDot } from '../types';
import TraitCategory from './TraitCategory';

const categoryNameByAffinity = {
  inClan: 'In-clan Disciplines',
  outOfClan: 'Out-of-clan Disciplines'
};

interface DisciplinesProps {
  affinity: 'inClan' | 'outOfClan';
  names: string[];
  displayNameOverride: { [key: string]: string };
  traits: any;
  setStartingDots: (category: string, trait: string, startingDots: number) => void;
  purchaseOrUnpurchaseDot: (category: string, trait: string) => void;
}

export default function Disciplines({
  affinity,
  names,
  displayNameOverride,
  traits,
  setStartingDots,
  purchaseOrUnpurchaseDot
}: DisciplinesProps) {
  const handleSetStartingDots = (categoryName: string, trait: string, startingDots: number) => {
    setStartingDots('disciplines.' + affinity, trait, startingDots);
  };

  const handlePurchaseOrUnpurchaseDot = (categoryName: string, trait: string) => {
    purchaseOrUnpurchaseDot('disciplines.' + affinity, trait);
  };

  const adjustAvailable = (availableStartingDots: AvailableStartingDot[]) => availableStartingDots;

  return (
    <TraitCategory
      categoryName={categoryNameByAffinity[affinity]}
      traitNames={names}
      traitDisplayNameOverride={displayNameOverride}
      categoryTraits={traits}
      adjustAvailable={adjustAvailable}
      setStartingDots={handleSetStartingDots}
      purchaseOrUnpurchaseDot={handlePurchaseOrUnpurchaseDot}
    />
  );
}
