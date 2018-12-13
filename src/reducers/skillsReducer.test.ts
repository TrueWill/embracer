import deepFreeze from 'deep-freeze';
import * as actions from '../actions/characterCreationActions';
import initialState from './initialState';
import reducer from './skillsReducer';

deepFreeze(initialState.character.skills);

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const nextState = reducer(undefined, action);

  expect(nextState).toBe(initialState.character.skills);
});

it('should set initial starting dots', () => {
  const state = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ]
  };

  deepFreeze(state);

  const action = actions.setStartingDots('skills', 'computer', 3);

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
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

it('should update starting dots', () => {
  const state = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 1 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      startingDots: 3,
      other: 'etc.'
    },
    dodge: {
      other: 'stuff'
    }
  };

  deepFreeze(state);

  const action = actions.setStartingDots('skills', 'computer', 4);

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    availableStartingDots: [
      { dots: 4, count: 0 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      startingDots: 4,
      other: 'etc.'
    },
    dodge: {
      other: 'stuff'
    }
  });
});

it('should add initial purchased dot', () => {
  const state = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ]
  };

  deepFreeze(state);

  const action = actions.purchaseDot('skills', 'computer');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
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
  const state = {
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

  deepFreeze(state);

  const action = actions.purchaseDot('skills', 'computer');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
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

it('should reduce purchased dots exceeding max if update starting dots', () => {
  const state = {
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

  deepFreeze(state);

  const action = actions.setStartingDots('skills', 'computer', 4);

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    availableStartingDots: [
      { dots: 4, count: 0 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      startingDots: 4,
      dotsPurchased: 1
    },
    dodge: {
      dotsPurchased: 3
    }
  });
});

it('should remove initial purchased dot and skill if no other properties', () => {
  const state = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    computer: {
      dotsPurchased: 1
    },
    dodge: {
      dotsPurchased: 3
    }
  };

  deepFreeze(state);

  const action = actions.unpurchaseDot('skills', 'computer');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ],
    dodge: {
      dotsPurchased: 3
    }
  });
});

it('should do nothing when category does not match', () => {
  const state = {
    availableStartingDots: [
      { dots: 4, count: 1 },
      { dots: 3, count: 2 },
      { dots: 2, count: 3 },
      { dots: 1, count: 4 }
    ]
  };

  deepFreeze(state);

  const action = actions.purchaseDot('attributes', 'mental');

  const nextState = reducer(state, action);

  expect(nextState).toBe(state);
});
