import { removeProperty, isEmpty } from './objectUtils';
import getDots from './getDots';
import { CategoryTraits, TraitState } from '../types';

function removeStartingDots(obj: Record<string, any>): Record<string, any> {
  return removeProperty(obj, 'startingDots');
}

export function setDotsFromStartingDots(
  categoryTraits: CategoryTraits,
  trait: string,
  startingDots: number,
  maxDots: number
): CategoryTraits {
  const matchingTrait = categoryTraits[trait] as TraitState;

  const previousStartingDots = matchingTrait && matchingTrait.startingDots;

  if (!previousStartingDots && startingDots === 0) {
    return categoryTraits;
  }

  const availableStartingDots = categoryTraits.availableStartingDots.map(a =>
    a.dots === startingDots
      ? { ...a, count: a.count - 1 }
      : a.dots === previousStartingDots
      ? { ...a, count: a.count + 1 }
      : a
  );

  const updatedTrait =
    startingDots === 0
      ? removeStartingDots(matchingTrait)
      : { ...matchingTrait, startingDots };

  if (startingDots > 0 && getDots(updatedTrait) > maxDots) {
    updatedTrait.dotsPurchased = maxDots - startingDots;
  }

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
}
