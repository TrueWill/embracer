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
    physical: {
      dots: 0
    },
    social: {
      dots: 0
    },
    mental: {
      dots: 0
    }
  };

  deepFreeze(state);

  const action = actions.setRank('attributes', 'mental', 1, 7);

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    physical: {
      dots: 0
    },
    social: {
      dots: 0
    },
    mental: {
      dots: 7,
      rank: 1
    }
  });
});

it('should update rank', () => {
  const state = {
    physical: {
      dots: 7,
      rank: 1
    },
    social: {
      dots: 3,
      rank: 3
    },
    mental: {
      dots: 5,
      rank: 2
    }
  };

  deepFreeze(state);

  const action = actions.setRank('attributes', 'mental', 1, 7);

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    physical: {
      dots: 0
    },
    social: {
      dots: 3,
      rank: 3
    },
    mental: {
      dots: 7,
      rank: 1
    }
  });
});

it('should do nothing when category does not match', () => {
  const state = {
    physical: {
      dots: 0
    },
    social: {
      dots: 0
    },
    mental: {
      dots: 0
    }
  };

  deepFreeze(state);

  const action = actions.setRank('skills', 'mental', 1, 7);

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    physical: {
      dots: 0
    },
    social: {
      dots: 0
    },
    mental: {
      dots: 0
    }
  });
});
