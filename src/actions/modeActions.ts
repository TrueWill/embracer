import * as types from '../constants/actionTypes';
import { BaseAction } from '../types';

export const togglePencilEraserMode: () => BaseAction = () => ({
  type: types.TOGGLE_PENCIL_ERASER_MODE
});
