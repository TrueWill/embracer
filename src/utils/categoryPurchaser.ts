import getDots from './getDots';
import { removeProperty, isEmpty } from './objectUtils';
import { TraitState, AvailableStartingDot } from '../types';

interface CategoryTraits {
  [traitName: string]: TraitState | AvailableStartingDot[];
}

const removeDotsPurchased = (obj: TraitState): Omit<TraitState, 'dotsPurchased'> =>
  removeProperty(obj, 'dotsPurchased');

export const addPurchasedDot = (
  categoryTraits: CategoryTraits,
  trait: string,
  maxDots: number
): CategoryTraits => {
  const matchingTrait = categoryTraits[trait];

  if (Array.isArray(matchingTrait)) {
    return categoryTraits; // Skip array properties like availableStartingDots
  }

  if (matchingTrait && getDots(matchingTrait) === maxDots) {
    return categoryTraits;
  }

  const previousDotsPurchased = matchingTrait
    ? matchingTrait.dotsPurchased || 0
    : 0;

  // It is legal to spread undefined.
  return {
    ...categoryTraits,
    [trait]: { ...matchingTrait, dotsPurchased: previousDotsPurchased + 1 }
  };
};

export const removePurchasedDot = (
  categoryTraits: CategoryTraits,
  trait: string,
  preserveEmptyTrait: boolean = false
): CategoryTraits => {
  const matchingTrait = categoryTraits[trait];

  if (Array.isArray(matchingTrait)) {
    return categoryTraits; // Skip array properties like availableStartingDots
  }

  if (!matchingTrait || !matchingTrait.dotsPurchased) {
    return categoryTraits;
  }

  const newDotsPurchased = matchingTrait.dotsPurchased - 1;

  const updatedTrait =
    newDotsPurchased === 0
      ? removeDotsPurchased(matchingTrait)
      : { ...matchingTrait, dotsPurchased: newDotsPurchased };

  return !preserveEmptyTrait && isEmpty(updatedTrait)
    ? removeProperty(categoryTraits, trait)
    : {
        ...categoryTraits,
        [trait]: updatedTrait
      };
};
