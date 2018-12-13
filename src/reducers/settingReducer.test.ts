import deepFreeze from 'deep-freeze';
import * as actions from '../actions/settingActions';
import initialState from './initialState';
import reducer from './settingReducer';

deepFreeze(initialState.setting);

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const nextState = reducer(undefined, action);

  expect(nextState).toBe(initialState.setting);
});

it('should update setting', () => {
  const state = {
    name: 'Camarilla',
    other: 'stuff'
  };

  deepFreeze(state);

  const action = actions.updateSetting('Sabbat');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    name: 'Sabbat',
    other: 'stuff'
  });
});
