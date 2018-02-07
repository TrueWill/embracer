import dotSelector from './dotSelector';

export const addPurchasedDot = (categoryTraits, trait, maxDots) => {
  const matchingTrait = categoryTraits[trait];

  if (matchingTrait && dotSelector(matchingTrait) === maxDots) {
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
