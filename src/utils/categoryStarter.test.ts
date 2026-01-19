import deepFreeze from 'deep-freeze';
import { setDotsFromStartingDots } from './categoryStarter';

const maxDots = 5;

it('should set initial starting dots', () => {
  const skills = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ]
  } as any;

  deepFreeze(skills);

  const result = setDotsFromStartingDots(skills, 'computer', 3, maxDots);

  expect(result).toEqual({
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 1 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      startingDots: 3
    }
  });
});

it('should set initial starting dots, preserving properties', () => {
  const skills = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      other: 'etc.'
    }
  } as any;

  deepFreeze(skills);

  const result = setDotsFromStartingDots(skills, 'computer', 3, maxDots);

  expect(result).toEqual({
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 1 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      startingDots: 3,
      other: 'etc.'
    }
  });
});

it('should update starting dots, preserving properties', () => {
  const skills = {
    availableStartingDots: [
      { dots: 4, count: 0 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    brawl: {
      other: 'stuff'
    },
    computer: {
      startingDots: 4,
      other: 'etc.'
    }
  } as any;

  deepFreeze(skills);

  const result = setDotsFromStartingDots(skills, 'computer', 3, maxDots);

  expect(result).toEqual({
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 1 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    brawl: {
      other: 'stuff'
    },
    computer: {
      startingDots: 3,
      other: 'etc.'
    }
  });
});

it('should clear starting dots when setting to 0, preserving properties', () => {
  const skills = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 1 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      other: 'stuff'
    },
    dodge: {
      startingDots: 3,
      other: 'etc.'
    }
  } as any;

  deepFreeze(skills);

  const result = setDotsFromStartingDots(skills, 'dodge', 0, maxDots);

  expect(result).toEqual({
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      other: 'stuff'
    },
    dodge: {
      other: 'etc.'
    }
  });
});

it('should remove trait when setting to 0 if no other properties', () => {
  const skills = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 1 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      other: 'stuff'
    },
    dodge: {
      startingDots: 3
    }
  } as any;

  deepFreeze(skills);

  const result = setDotsFromStartingDots(skills, 'dodge', 0, maxDots);

  expect(result).toEqual({
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      other: 'stuff'
    }
  });
});

it('should do nothing when setting to 0 if unset', () => {
  const skills = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ]
  } as any;

  deepFreeze(skills);

  const result = setDotsFromStartingDots(skills, 'brawl', 0, maxDots);

  expect(result).toEqual(skills);
});

it('should reduce purchased dots exceeding max if set', () => {
  const skills = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      dotsPurchased: 3
    }
  } as any;

  deepFreeze(skills);

  const result = setDotsFromStartingDots(skills, 'computer', 3, maxDots);

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
    }
  });
});
