import initialState from './initialState';
import * as types from '../constants/actionTypes';
import type { ModeState, TogglePencilEraserModeAction } from '../types';

type ModeAction = TogglePencilEraserModeAction;

const modeReducer = (
  state: ModeState = initialState.mode,
  action: ModeAction
): ModeState => {
  switch (action.type) {
    case types.TOGGLE_PENCIL_ERASER_MODE:
      return { ...state, isEraser: !state.isEraser };
    default:
      return state;
  }
};

export default modeReducer;
