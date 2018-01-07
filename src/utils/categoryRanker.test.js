import deepFreeze from 'deep-freeze';
import { setDotsFromRank } from './categoryRanker';

it('should set initial rank', () => {
  const attributes = {
    physical: {},
    social: {},
    mental: {}
  };

  deepFreeze(attributes);

  const result = setDotsFromRank(attributes, 'social', 3);

  expect(result).toEqual({
    physical: {},
    social: {
      dotsFromRank: 3
    },
    mental: {}
  });
});

it('should update rank, preserving properties', () => {
  const attributes = {
    physical: {
      other: 'stuff'
    },
    social: {
      dotsFromRank: 7,
      other: 'etc.'
    },
    mental: {}
  };

  deepFreeze(attributes);

  const result = setDotsFromRank(attributes, 'social', 3);

  expect(result).toEqual({
    physical: {
      other: 'stuff'
    },
    social: {
      dotsFromRank: 3,
      other: 'etc.'
    },
    mental: {}
  });
});

it('should move rank, preserving properties', () => {
  const attributes = {
    physical: {
      other: 'stuff'
    },
    social: {},
    mental: {
      dotsFromRank: 3,
      other: 'etc.'
    }
  };

  deepFreeze(attributes);

  const result = setDotsFromRank(attributes, 'physical', 3);

  expect(result).toEqual({
    physical: {
      dotsFromRank: 3,
      other: 'stuff'
    },
    social: {},
    mental: {
      other: 'etc.'
    }
  });
});

it('should swap rank', () => {
  const attributes = {
    physical: {
      dotsFromRank: 7
    },
    social: {
      dotsFromRank: 3
    },
    mental: {
      dotsFromRank: 5
    }
  };

  deepFreeze(attributes);

  const result = setDotsFromRank(attributes, 'mental', 7);

  expect(result).toEqual({
    physical: {
      dotsFromRank: 5
    },
    social: {
      dotsFromRank: 3
    },
    mental: {
      dotsFromRank: 7
    }
  });
});

it('should clear rank when setting to 0, preserving properties', () => {
  const attributes = {
    physical: {
      dotsFromRank: 7,
      other: 'etc.'
    },
    social: {
      dotsFromRank: 3
    },
    mental: {}
  };

  deepFreeze(attributes);

  const result = setDotsFromRank(attributes, 'physical', 0);

  expect(result).toEqual({
    physical: {
      other: 'etc.'
    },
    social: {
      dotsFromRank: 3
    },
    mental: {}
  });
});

it('should do nothing when setting to 0 if unset', () => {
  const attributes = {
    physical: {
      other: 'etc.'
    },
    social: {
      dotsFromRank: 3
    },
    mental: {}
  };

  deepFreeze(attributes);

  const result = setDotsFromRank(attributes, 'physical', 0);

  expect(result).toEqual(attributes);
});
