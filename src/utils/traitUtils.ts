import { AvailableStartingDot, TraitState } from '../types';

const startingDotsProperty = 'availableStartingDots';

export const getTraitNames = (traits: {
  [key: string]: TraitState | AvailableStartingDot[];
}): string[] => {
  const names = Object.keys(traits).filter(x => x !== startingDotsProperty);

  names.sort();

  return names;
};
