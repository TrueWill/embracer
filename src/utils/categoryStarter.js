import { removeProperty, isEmpty } from './objectUtils';

const removeStartingDots = obj => removeProperty(obj, 'startingDots');

export const setDotsFromStartingDots = (
  categoryTraits,
  trait,
  startingDots
) => {
  const matchingTrait = categoryTraits[trait];

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

  return isEmpty(updatedTrait)
    ? {
        ...removeProperty(categoryTraits, trait),
        availableStartingDots
      }
    : {
        ...categoryTraits,
        availableStartingDots,
        [trait]: updatedTrait
      };
};
