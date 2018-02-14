import deepFreeze from 'deep-freeze';
import * as actions from '../actions/characterCreationActions';
import initialState from './initialState';
import reducer from './attributesReducer';

deepFreeze(initialState.character.attributes);

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const nextState = reducer(undefined, action);

  expect(nextState).toBe(initialState.character.attributes);
});

it('should set initial rank', () => {
  const state = {
    physical: {},
    social: {},
    mental: {}
  };

  deepFreeze(state);

  const action = actions.setRank('attributes', 'mental', 7);

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    physical: {},
    social: {},
    mental: {
      dotsFromRank: 7
    }
  });
});

it('should update rank', () => {
  const state = {
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

  deepFreeze(state);

  const action = actions.setRank('attributes', 'mental', 7);

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
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

it('should do nothing when category does not match', () => {
  const state = {
    physical: {},
    social: {},
    mental: {}
  };

  deepFreeze(state);

  const action = actions.setRank('skills', 'mental', 7);

  const nextState = reducer(state, action);

  expect(nextState).toBe(state);
});

it('should set initial focus, preserving properties', () => {
  const state = {
    physical: {
      other: 'etc.'
    },
    social: {
      other: 'stuff'
    },
    mental: {}
  };

  deepFreeze(state);

  const action = actions.setFocus('physical', 'Strength');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    physical: {
      other: 'etc.',
      focus: 'Strength'
    },
    social: {
      other: 'stuff'
    },
    mental: {}
  });
});

it('should update focus, preserving properties', () => {
  const state = {
    physical: {
      other: 'etc.',
      focus: 'Strength'
    },
    social: {
      other: 'stuff',
      focus: 'Charisma'
    },
    mental: {}
  };

  deepFreeze(state);

  const action = actions.setFocus('social', 'Manipulation');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    physical: {
      other: 'etc.',
      focus: 'Strength'
    },
    social: {
      other: 'stuff',
      focus: 'Manipulation'
    },
    mental: {}
  });
});

it('should set empty focus', () => {
  // Focus is required, so no point in removing property.

  const state = {
    physical: {},
    social: {
      other: 'stuff',
      focus: 'Charisma'
    },
    mental: {}
  };

  deepFreeze(state);

  const action = actions.setFocus('social', '');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    physical: {},
    social: {
      other: 'stuff',
      focus: ''
    },
    mental: {}
  });
});

it('should add initial purchased dot', () => {
  const state = {
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

  deepFreeze(state);

  const action = actions.purchaseDot('attributes', 'mental');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    physical: {
      dotsFromRank: 7
    },
    social: {
      dotsFromRank: 3
    },
    mental: {
      dotsFromRank: 5,
      dotsPurchased: 1
    }
  });
});

it('should add subsequent purchased dot', () => {
  const state = {
    physical: {
      dotsFromRank: 7,
      dotsPurchased: 1
    },
    social: {
      dotsFromRank: 3
    },
    mental: {
      dotsFromRank: 5,
      dotsPurchased: 2
    }
  };

  deepFreeze(state);

  const action = actions.purchaseDot('attributes', 'mental');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    physical: {
      dotsFromRank: 7,
      dotsPurchased: 1
    },
    social: {
      dotsFromRank: 3
    },
    mental: {
      dotsFromRank: 5,
      dotsPurchased: 3
    }
  });
});

it('should do nothing if purchased dot would exceed max', () => {
  const state = {
    physical: {
      dotsFromRank: 7,
      dotsPurchased: 3
    },
    social: {
      dotsFromRank: 5
    },
    mental: {
      dotsFromRank: 3
    }
  };

  deepFreeze(state);

  const action = actions.purchaseDot('attributes', 'physical');

  const nextState = reducer(state, action);

  expect(nextState).toEqual(state);
});

it('should reduce purchased dots exceeding max if update rank', () => {
  const state = {
    physical: {
      dotsFromRank: 7,
      dotsPurchased: 3
    },
    social: {
      dotsFromRank: 5,
      dotsPurchased: 1
    },
    mental: {
      dotsFromRank: 3,
      dotsPurchased: 7
    }
  };

  deepFreeze(state);

  const action = actions.setRank('attributes', 'physical', 3);

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    physical: {
      dotsFromRank: 3,
      dotsPurchased: 3
    },
    social: {
      dotsFromRank: 5,
      dotsPurchased: 1
    },
    mental: {
      dotsFromRank: 7,
      dotsPurchased: 3
    }
  });
});

it('should remove subsequent purchased dot', () => {
  const state = {
    physical: {
      dotsFromRank: 7,
      dotsPurchased: 1
    },
    social: {
      dotsFromRank: 3
    },
    mental: {
      dotsFromRank: 5,
      dotsPurchased: 2
    }
  };

  deepFreeze(state);

  const action = actions.unpurchaseDot('attributes', 'mental');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    physical: {
      dotsFromRank: 7,
      dotsPurchased: 1
    },
    social: {
      dotsFromRank: 3
    },
    mental: {
      dotsFromRank: 5,
      dotsPurchased: 1
    }
  });
});

it('should remove initial purchased dot without removing attribute', () => {
  const state = {
    physical: {},
    social: {},
    mental: {
      dotsPurchased: 1
    }
  };

  deepFreeze(state);

  const action = actions.unpurchaseDot('attributes', 'mental');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    physical: {},
    social: {},
    mental: {}
  });
});
