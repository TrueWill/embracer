import deepFreeze from 'deep-freeze';
import { addPurchasedDot, removePurchasedDot } from './categoryPurchaser';

const maxDots = 5;

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

  const result = addPurchasedDot(skills, 'computer', maxDots);

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

  const result = addPurchasedDot(skills, 'computer', maxDots);

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

it('should do nothing if purchased dot would exceed max', () => {
  const skills = {
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
  };

  deepFreeze(skills);

  const result = addPurchasedDot(skills, 'computer', maxDots);

  expect(result).toEqual(skills);
});

it('should remove subsequent purchased dot', () => {
  const skills = {
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
  };

  deepFreeze(skills);

  const result = removePurchasedDot(skills, 'computer');

  expect(result).toEqual({
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
  });
});

it('should remove initial purchased dot, preserving properties', () => {
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

  const result = removePurchasedDot(skills, 'computer');

  expect(result).toEqual({
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 1 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      startingDots: 3
    },
    dodge: {
      dotsPurchased: 3
    }
  });
});

it('should remove trait when removing initial purchased dot if no other properties', () => {
  const skills = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      dotsPurchased: 1
    }
  };

  deepFreeze(skills);

  const result = removePurchasedDot(skills, 'computer');

  expect(result).toEqual({
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ]
  });
});

it('should do nothing when remove if no purchased dots', () => {
  const skills = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 1 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      startingDots: 3
    },
    dodge: {
      dotsPurchased: 3
    }
  };

  deepFreeze(skills);

  const result = removePurchasedDot(skills, 'computer');

  expect(result).toEqual(skills);
});

it('should do nothing when remove if not found', () => {
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
    }
  };

  deepFreeze(skills);

  const result = removePurchasedDot(skills, 'dodge');

  expect(result).toEqual(skills);
});
