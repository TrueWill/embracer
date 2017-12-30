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

it('should swap rank', () => {
  const skills = {
    brawl: {
      dotsFromRank: 4
    },
    computer: {},
    crafts: {
      dotsFromRank: 2
    },
    dodge: {
      dotsFromRank: 3
    }
  };

  deepFreeze(skills);

  const rankDots = [4, 3, 2, 1];

  const result = assignRank(skills, { trait: 'dodge', rankDots, index: 0 });

  expect(result).toEqual({
    brawl: {
      dotsFromRank: 3
    },
    computer: {},
    crafts: {
      dotsFromRank: 2
    },
    dodge: {
      dotsFromRank: 4
    }
  });
});
