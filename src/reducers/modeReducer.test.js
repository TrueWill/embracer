import deepFreeze from 'deep-freeze';
import * as actions from '../actions/modeActions';
import initialState from './initialState';
import reducer from './modeReducer';

deepFreeze(initialState.mode);

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const nextState = reducer(undefined, action);

  expect(nextState).toBe(initialState.mode);
});

it('should toggle to eraser mode', () => {
  const state = {
    isEraser: false
  };

  deepFreeze(state);

  const action = actions.togglePencilEraserMode();

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    isEraser: true
  });
});

it('should toggle to pencil mode', () => {
  const state = {
    isEraser: true
  };

  deepFreeze(state);

  const action = actions.togglePencilEraserMode();

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    isEraser: false
  });
});
