import deepFreeze from 'deep-freeze';
import * as actions from '../actions/characterCreationActions';
import initialState from './initialState';
import reducer from './basicInfoReducer';

deepFreeze(initialState.character.basicInfo);

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const nextState = reducer(undefined, action);

  expect(nextState).toBe(initialState.character.basicInfo);
});

it('should update archetype', () => {
  const state = {
    archetype: 'old',
    clan: { name: 'Tremere' }
  };

  deepFreeze(state);

  const action = actions.updateArchetype('new');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    archetype: 'new',
    clan: { name: 'Tremere' }
  });
});

it('should update clan from bloodline', () => {
  const state = {
    archetype: 'Monster',
    clan: {
      name: 'Tzimisce',
      bloodline: 'Koldun',
      meritPoints: 4
    }
  };

  deepFreeze(state);

  const action = actions.updateClan('Tremere');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    archetype: 'Monster',
    clan: { name: 'Tremere' }
  });
});

it('should update clan to bloodline', () => {
  const state = {
    archetype: 'Monster',
    clan: { name: 'Tremere' }
  };

  deepFreeze(state);

  const action = actions.updateClan('Tzimisce', 'Koldun', 4);

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    archetype: 'Monster',
    clan: {
      name: 'Tzimisce',
      bloodline: 'Koldun',
      meritPoints: 4
    }
  });
});
