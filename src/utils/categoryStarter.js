import { removeProperty } from './objectUtils';

const removeStartingDots = obj => removeProperty(obj, 'startingDots');

export const setDotsFromStartingDots = (
  categoryTraits,
  trait,
  startingDots
) => {
  const matchingTrait = categoryTraits[trait];

  // TODO: Refactor

  const previousStartingDots = matchingTrait && matchingTrait.startingDots;

  if (!previousStartingDots && startingDots === 0) {
    return categoryTraits;
  }

  const availableStartingDots = categoryTraits.availableStartingDots.map(
    a =>
      a.dots === startingDots
        ? { ...a, count: a.count - 1 }
        : a.dots === previousStartingDots ? { ...a, count: a.count + 1 } : a
  );

  const updatedTrait =
    startingDots === 0
      ? removeStartingDots(matchingTrait)
      : { ...matchingTrait, startingDots };

  if (Object.keys(updatedTrait).length === 0) {
    return {
      ...removeProperty(categoryTraits, trait),
      availableStartingDots
    };
  }

  return {
    ...categoryTraits,
    availableStartingDots,
    [trait]: updatedTrait
  };
};
