import { TraitState } from '../types';

// Not a true selector, as input is only part of the entire state.
export default function getDots(traitState: TraitState): number {
  return (
    (traitState.dotsFromRank || 0) +
    (traitState.startingDots || 0) +
    (traitState.dotsPurchased || 0)
  );
}
