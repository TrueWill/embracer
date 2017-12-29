import deepFreeze from 'deep-freeze';
import assignRank from './categoryRanker';

it('should assign initial rank', () => {
  const skills = {
    brawl: {},
    computer: {},
    crafts: {},
    dodge: {}
  };

  deepFreeze(skills);

  const rankDots = [4, 3, 2, 1];

  const result = assignRank(skills, { trait: 'computer', rankDots, index: 1 });

  expect(result).toEqual({
    brawl: {},
    computer: {
      dotsFromRank: 3
    },
    crafts: {},
    dodge: {}
  });
});

it('should update rank, preserving properties', () => {
  const skills = {
    brawl: {
      other: 'stuff'
    },
    computer: {
      dotsFromRank: 4,
      other: 'etc.'
    },
    crafts: {},
    dodge: {}
  };

  deepFreeze(skills);

  const rankDots = [4, 3, 2, 1];

  const result = assignRank(skills, { trait: 'computer', rankDots, index: 1 });

  expect(result).toEqual({
    brawl: {
      other: 'stuff'
    },
    computer: {
      dotsFromRank: 3,
      other: 'etc.'
    },
    crafts: {},
    dodge: {}
  });
});

it('should move rank, preserving properties', () => {
  const skills = {
    brawl: {},
    computer: {
      other: 'stuff'
    },
    crafts: {},
    dodge: {
      dotsFromRank: 3,
      other: 'etc.'
    }
  };

  deepFreeze(skills);

  const rankDots = [4, 3, 2, 1];

  const result = assignRank(skills, { trait: 'computer', rankDots, index: 1 });

  expect(result).toEqual({
    brawl: {},
    computer: {
      dotsFromRank: 3,
      other: 'stuff'
    },
    crafts: {},
    dodge: {
      other: 'etc.'
    }
  });
});
