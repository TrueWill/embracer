const removeDotsFromRank = obj => {
  const { dotsFromRank, ...result } = obj;
  return result;
};

const assignRank = (categoryTraits, { trait, rankDots, index }) => {
  const dotsFromRank = rankDots[index];

  const result = {};

  // TODO: working - possibly use reduce - also handle swapping ranks - update reducer etc.
  Object.keys(categoryTraits).map(key => {
    const categoryTrait = categoryTraits[key];

    if (key === trait) {
      result[key] = { ...categoryTrait, dotsFromRank };
    } else if (categoryTrait.dotsFromRank === dotsFromRank) {
      result[key] = removeDotsFromRank(categoryTrait);
    } else {
      result[key] = categoryTrait;
    }

    return null;
  });

  return result;
};

export default assignRank;
