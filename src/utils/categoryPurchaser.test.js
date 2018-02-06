import deepFreeze from 'deep-freeze';
import { addPurchasedDot } from './categoryPurchaser';

it('should add initial purchased dot', () => {
  const skills = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ]
  };

  deepFreeze(skills);

  const result = addPurchasedDot(skills, 'computer');

  expect(result).toEqual({
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      dotsPurchased: 1
    }
  });
});

it('should add subsequent purchased dot', () => {
  const skills = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 1 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      startingDots: 3,
      dotsPurchased: 1
    },
    dodge: {
      dotsPurchased: 3
    }
  };

  deepFreeze(skills);

  const result = addPurchasedDot(skills, 'computer');

  expect(result).toEqual({
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 1 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      startingDots: 3,
      dotsPurchased: 2
    },
    dodge: {
      dotsPurchased: 3
    }
  });
});
