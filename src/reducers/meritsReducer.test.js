import deepFreeze from 'deep-freeze';
import * as actions from '../actions/characterCreationActions';
import initialState from './initialState';
import reducer from './meritsReducer';

deepFreeze(initialState.character.merits);

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const nextState = reducer(undefined, action);

  expect(nextState).toBe(initialState.character.merits);
});

it('should add merit, preserving existing', () => {
  const state = [
    {
      name: 'Calm Heart',
      points: 1
    }
  ];

  deepFreeze(state);

  const action = actions.addMerit('Clear Sighted', 3);

  const nextState = reducer(state, action);

  expect(nextState).toEqual([
    {
      name: 'Calm Heart',
      points: 1
    },
    {
      name: 'Clear Sighted',
      points: 3
    }
  ]);
});

it('should remove merit', () => {
  const state = [
    {
      name: 'Calm Heart',
      points: 1
    },
    {
      name: 'Clear Sighted',
      points: 3
    }
  ];

  deepFreeze(state);

  const action = actions.removeMerit('Calm Heart');

  const nextState = reducer(state, action);

  expect(nextState).toEqual([
    {
      name: 'Clear Sighted',
      points: 3
    }
  ]);
});
