import * as types from '../constants/actionTypes';
import { TogglePencilEraserModeAction } from '../types';

export const togglePencilEraserMode = (): TogglePencilEraserModeAction => ({
  type: types.TOGGLE_PENCIL_ERASER_MODE
});
