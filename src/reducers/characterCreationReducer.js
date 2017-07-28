import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.character, action) => {
  switch (action.type) {
    case types.UPDATE_ARCHETYPE:
      return { ...state, archetype: action.archetype };
    default:
      return state;
  }
};
