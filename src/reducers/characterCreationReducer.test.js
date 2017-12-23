import deepFreeze from 'deep-freeze';
import * as actions from '../actions/characterCreationActions';
import initialState from './initialState';
import characterCreation from './characterCreationReducer';

deepFreeze(initialState.character);

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const nextState = characterCreation(undefined, action);

  expect(nextState).toBe(initialState.character);
});

it('should update archetype', () => {
  const state = {
    archetype: 'old',
    clan: 'aclan'
  };

  deepFreeze(state);

  const action = actions.updateArchetype('new');

  const nextState = characterCreation(state, action);

  expect(nextState).toEqual({
    archetype: 'new',
    clan: 'aclan'
  });
});

it('should update clan', () => {
  const state = {
    archetype: 'arc',
    clan: 'old'
  };

  deepFreeze(state);

  const action = actions.updateClan('new');

  const nextState = characterCreation(state, action);

  expect(nextState).toEqual({
    archetype: 'arc',
    clan: 'new'
  });
});
