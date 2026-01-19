import { removeProperty } from './objectUtils';
import getDots from './getDots';
import { TraitState, AvailableStartingDot } from '../types';

interface CategoryTraits {
  [traitName: string]: TraitState | AvailableStartingDot[];
}

const removeDotsFromRank = (obj: TraitState): Omit<TraitState, 'dotsFromRank'> =>
  removeProperty(obj, 'dotsFromRank');

export const setDotsFromRank = (
  categoryTraits: CategoryTraits,
  trait: string,
  dotsFromRank: number,
  maxDots: number
): CategoryTraits => {
  const matchingTrait = categoryTraits[trait];

  if (Array.isArray(matchingTrait)) {
    return categoryTraits; // Skip array properties like availableStartingDots
  }

  if (!dotsFromRank) {
    return { ...categoryTraits, [trait]: removeDotsFromRank(matchingTrait) };
  }

  const previousDotsFromRank = matchingTrait.dotsFromRank;

  return Object.keys(categoryTraits).reduce((acc, key) => {
    const categoryTrait = categoryTraits[key];

    let updatedTrait: TraitState | AvailableStartingDot[];

    if (Array.isArray(categoryTrait)) {
      // Preserve array properties like availableStartingDots
      updatedTrait = categoryTrait;
    } else if (key === trait) {
      updatedTrait = { ...categoryTrait, dotsFromRank };
    } else if (categoryTrait.dotsFromRank === dotsFromRank) {
      if (previousDotsFromRank) {
        // swap ranks
        updatedTrait = { ...categoryTrait, dotsFromRank: previousDotsFromRank };
      } else {
        updatedTrait = removeDotsFromRank(categoryTrait);
      }
    } else {
      updatedTrait = categoryTrait;
    }

    if (!Array.isArray(updatedTrait) && getDots(updatedTrait) > maxDots) {
      updatedTrait.dotsPurchased = maxDots - updatedTrait.dotsFromRank!;
    }

    return { ...acc, [key]: updatedTrait };
  }, {} as CategoryTraits);
};
