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

  expect(nextState).toEqual({
    physical: {},
    social: {},
    mental: {}
  });
});
