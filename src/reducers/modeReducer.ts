import initialState from './initialState';
import * as types from '../constants/actionTypes';
import type { ModeState, CharacterAction } from '../types';

const modeReducer = (
  state: ModeState = initialState.mode,
  action: CharacterAction
): ModeState => {
  switch (action.type) {
    case types.TOGGLE_PENCIL_ERASER_MODE:
      return { ...state, isEraser: !state.isEraser };
    default:
      return state;
  }
};

export default modeReducer;
