import deepFreeze from 'deep-freeze';
import * as actions from '../actions/characterCreationActions';
import { updateSetting } from '../actions/settingActions';
import initialState from './initialState';
import reducer from './flawsReducer';

deepFreeze(initialState.character.flaws);

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const nextState = reducer(undefined, action);

  expect(nextState).toBe(initialState.character.flaws);
});

it('should add flaw, preserving existing', () => {
  const state = [
    {
      name: 'Addiction',
      points: 2
    }
  ];

  deepFreeze(state);

  const action = actions.addFlaw('Beacon of the Unholy', 3);

  const nextState = reducer(state, action);

  expect(nextState).toEqual([
    {
      name: 'Addiction',
      points: 2
    },
    {
      name: 'Beacon of the Unholy',
      points: 3
    }
  ]);
});

it('should remove flaw', () => {
  const state = [
    {
      name: 'Addiction',
      points: 2
    },
    {
      name: 'Beacon of the Unholy',
      points: 3
    }
  ];

  deepFreeze(state);

  const action = actions.removeFlaw('Beacon of the Unholy');

  const nextState = reducer(state, action);

  expect(nextState).toEqual([
    {
      name: 'Addiction',
      points: 2
    }
  ]);
});

it('should clear if change setting', () => {
  const state = [
    {
      name: 'Addiction',
      points: 2
    },
    {
      name: 'Beacon of the Unholy',
      points: 3
    }
  ];

  deepFreeze(state);

  const action = updateSetting('Sabbat');

  const nextState = reducer(state, action);

  expect(nextState).toEqual([]);
});
