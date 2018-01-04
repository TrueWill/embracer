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
