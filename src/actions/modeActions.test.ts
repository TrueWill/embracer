import { togglePencilEraserMode } from './modeActions';
import * as types from '../constants/actionTypes';

it('should create a toggle pencil eraser mode action', () => {
  const action = togglePencilEraserMode();

  expect(action).toEqual({
    type: types.TOGGLE_PENCIL_ERASER_MODE
  });
});
