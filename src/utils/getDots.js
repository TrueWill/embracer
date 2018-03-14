// Not a true selector, as input is only part of the entire state.
const getDots = traitState =>
  (traitState.dotsFromRank || 0) +
  (traitState.startingDots || 0) +
  (traitState.dotsPurchased || 0);

export default getDots;
