import { removeProperty } from './objectUtils';
import getDots from './getDots';
import { TraitState } from '../types';

interface CategoryTraits {
  [traitName: string]: TraitState;
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

  if (!dotsFromRank) {
    return { ...categoryTraits, [trait]: removeDotsFromRank(matchingTrait) };
  }

  const previousDotsFromRank = matchingTrait.dotsFromRank;

  return Object.keys(categoryTraits).reduce((acc, key) => {
    const categoryTrait = categoryTraits[key];

    let updatedTrait: TraitState;

    if (key === trait) {
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

    if (getDots(updatedTrait) > maxDots) {
      updatedTrait.dotsPurchased = maxDots - updatedTrait.dotsFromRank!;
    }

    return { ...acc, [key]: updatedTrait };
  }, {} as CategoryTraits);
};
