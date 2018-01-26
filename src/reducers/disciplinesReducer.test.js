import deepFreeze from 'deep-freeze';
import * as actions from '../actions/characterCreationActions';
import initialState from './initialState';
import reducer from './disciplinesReducer';

deepFreeze(initialState.character.disciplines);

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const nextState = reducer(undefined, action);

  expect(nextState).toBe(initialState.character.disciplines);
});

it('should set starting dots', () => {
  const state = {
    inClan: {
      availableStartingDots: [{ dots: 2, count: 1 }, { dots: 1, count: 2 }]
    },
    outOfClan: {
      availableStartingDots: []
    }
  };

  deepFreeze(state);

  const action = actions.setStartingDots('disciplines.inClan', 'Celerity', 2);

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    inClan: {
      availableStartingDots: [{ dots: 2, count: 0 }, { dots: 1, count: 2 }],
      Celerity: {
        startingDots: 2
      }
    },
    outOfClan: {
      availableStartingDots: []
    }
  });
});

it('should clear if change clan', () => {
  const state = {
    inClan: {
      availableStartingDots: [{ dots: 2, count: 0 }, { dots: 1, count: 2 }],
      Celerity: {
        startingDots: 2
      },
      outOfClan: {
        availableStartingDots: [],
        Potence: {}
      }
    }
  };

  deepFreeze(state);

  const action = actions.updateClan('Tremere');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    inClan: {
      availableStartingDots: [{ dots: 2, count: 1 }, { dots: 1, count: 2 }]
    },
    outOfClan: {
      availableStartingDots: []
    }
  });
});
