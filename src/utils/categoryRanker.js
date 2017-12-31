const removeDotsFromRank = obj => {
  const { dotsFromRank, ...result } = obj;
  return result;
};

export const setDotsFromRank = (categoryTraits, trait, dotsFromRank) => {
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

    return { ...acc, [key]: updatedTrait };
  }, {});
};
