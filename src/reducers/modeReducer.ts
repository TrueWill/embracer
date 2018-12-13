import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.mode, action) => {
  switch (action.type) {
    case types.TOGGLE_PENCIL_ERASER_MODE:
      return { ...state, isEraser: !state.isEraser };
    default:
      return state;
  }
};
