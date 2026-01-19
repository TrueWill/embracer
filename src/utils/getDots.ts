import { TraitState } from '../types';

// Not a true selector, as input is only part of the entire state.
const getDots = (traitState: TraitState | undefined): number => {
  if (!traitState) return 0;
  return (
    (traitState.dotsFromRank || 0) +
    (traitState.startingDots || 0) +
    (traitState.dotsPurchased || 0)
  );
};

export default getDots;
