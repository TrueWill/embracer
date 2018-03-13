import getDots from './getDots';
import { removeProperty, isEmpty } from './objectUtils';

const removeDotsPurchased = obj => removeProperty(obj, 'dotsPurchased');

export const addPurchasedDot = (categoryTraits, trait, maxDots) => {
  const matchingTrait = categoryTraits[trait];

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
  categoryTraits,
  trait,
  preserveEmptyTrait = false
) => {
  const matchingTrait = categoryTraits[trait];

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
