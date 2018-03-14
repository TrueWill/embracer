import { removeProperty } from './objectUtils';
import getDots from './getDots';

const removeDotsFromRank = obj => removeProperty(obj, 'dotsFromRank');

export const setDotsFromRank = (
  categoryTraits,
  trait,
  dotsFromRank,
  maxDots
) => {
  const matchingTrait = categoryTraits[trait];

  if (!dotsFromRank) {
    return { ...categoryTraits, [trait]: removeDotsFromRank(matchingTrait) };
  }

  const previousDotsFromRank = matchingTrait.dotsFromRank;

  return Object.keys(categoryTraits).reduce((acc, key) => {
    const categoryTrait = categoryTraits[key];

    let updatedTrait;

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
      updatedTrait.dotsPurchased = maxDots - updatedTrait.dotsFromRank;
    }

    return { ...acc, [key]: updatedTrait };
  }, {});
};
