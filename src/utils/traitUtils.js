const startingDotsProperty = 'availableStartingDots';

export const getTraitNames = traits => {
  const names = Object.keys(traits).filter(x => x !== startingDotsProperty);

  names.sort();

  return names;
};
