import { TraitMap } from '../types';

const startingDotsProperty = 'availableStartingDots';

export const getTraitNames = (traits: TraitMap): string[] => {
  const names = Object.keys(traits).filter(x => x !== startingDotsProperty);

  names.sort();

  return names;
};
