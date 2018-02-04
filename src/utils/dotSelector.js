const dotSelector = traitState =>
  (traitState.dotsFromRank || 0) +
  (traitState.startingDots || 0) +
  (traitState.dotsPurchased || 0);

export default dotSelector;
