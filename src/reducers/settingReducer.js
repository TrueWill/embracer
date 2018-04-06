import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.setting, action) => {
  switch (action.type) {
    case types.UPDATE_SETTING:
      return { ...state, name: action.payload.name };
    default:
      return state;
  }
};
