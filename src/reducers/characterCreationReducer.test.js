import * as actions from '../actions/characterCreationActions';
import initialState from './initialState';
import characterCreation from './characterCreationReducer';

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const newState = characterCreation(undefined, action);

  expect(newState).toBe(initialState.character);
});

it('should not mutate state', () => {
  const state = {
    archetype: 'old',
    clan: 'aclan'
  };

  const action = actions.updateArchetype('new');

  characterCreation(state, action);

  expect(state.archetype).toBe('old');
});

it('should update archetype', () => {
  const state = {
    archetype: 'old',
    clan: 'aclan'
  };

  const action = actions.updateArchetype('new');

  const newState = characterCreation(state, action);

  expect(newState).toEqual({
    archetype: 'new',
    clan: 'aclan'
  });
});

it('should update clan', () => {
  const state = {
    archetype: 'arc',
    clan: 'old'
  };

  const action = actions.updateClan('new');

  const newState = characterCreation(state, action);

  expect(newState).toEqual({
    archetype: 'arc',
    clan: 'new'
  });
});
