export const addPurchasedDot = (categoryTraits, trait) => {
  const matchingTrait = categoryTraits[trait];

  const previousDotsPurchased = matchingTrait
    ? matchingTrait.dotsPurchased || 0
    : 0;

  // It is legal to spread undefined.
  return {
    ...categoryTraits,
    [trait]: { ...matchingTrait, dotsPurchased: previousDotsPurchased + 1 }
  };
};
