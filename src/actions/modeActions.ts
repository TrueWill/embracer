import * as types from '../constants/actionTypes';
import { Action } from 'redux';

export type TogglePencilEraserModeAction = Action<
  types.TOGGLE_PENCIL_ERASER_MODE
>;

export const togglePencilEraserMode = (): TogglePencilEraserModeAction => ({
  type: types.TOGGLE_PENCIL_ERASER_MODE
});
