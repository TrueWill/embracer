import rootReducer from './index';
import initialState from './initialState';
import * as types from '../constants/actionTypes';

it('should return the initial state', () => {
  const state = rootReducer(undefined, { type: '@@INIT' } as any);

  expect(state.mode).toEqual(initialState.mode);
  expect(state.setting).toEqual(initialState.setting);
  expect(state.character.basicInfo).toEqual(initialState.character.basicInfo);
  expect(state.character.merits).toEqual(initialState.character.merits);
  expect(state.character.flaws).toEqual(initialState.character.flaws);
});

it('should have all expected top-level keys', () => {
  const state = rootReducer(undefined, { type: '@@INIT' } as any);

  expect(state).toHaveProperty('mode');
  expect(state).toHaveProperty('setting');
  expect(state).toHaveProperty('character');
});

it('should have all expected character keys', () => {
  const state = rootReducer(undefined, { type: '@@INIT' } as any);

  expect(state.character).toHaveProperty('basicInfo');
  expect(state.character).toHaveProperty('attributes');
  expect(state.character).toHaveProperty('skills');
  expect(state.character).toHaveProperty('backgrounds');
  expect(state.character).toHaveProperty('disciplines');
  expect(state.character).toHaveProperty('merits');
  expect(state.character).toHaveProperty('flaws');
  expect(state.character).toHaveProperty('morality');
});

it('should handle toggle pencil eraser mode', () => {
  const state = rootReducer(undefined, { type: '@@INIT' } as any);

  const newState = rootReducer(state, {
    type: types.TOGGLE_PENCIL_ERASER_MODE
  });

  expect(newState.mode.isEraser).toBe(true);
});

it('should handle update setting', () => {
  const state = rootReducer(undefined, { type: '@@INIT' } as any);

  const newState = rootReducer(state, {
    type: types.UPDATE_SETTING,
    payload: { name: 'Sabbat' }
  });

  expect(newState.setting.name).toBe('Sabbat');
});

it('should handle update archetype', () => {
  const state = rootReducer(undefined, { type: '@@INIT' } as any);

  const newState = rootReducer(state, {
    type: types.UPDATE_ARCHETYPE,
    payload: 'Survivor'
  });

  expect(newState.character.basicInfo.archetype).toBe('Survivor');
});

it('should handle update clan', () => {
  const state = rootReducer(undefined, { type: '@@INIT' } as any);

  const newState = rootReducer(state, {
    type: types.UPDATE_CLAN,
    payload: { name: 'Brujah' }
  });

  expect(newState.character.basicInfo.clan.name).toBe('Brujah');
});
