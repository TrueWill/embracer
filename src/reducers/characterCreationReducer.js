import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.character, action) => {
  switch (action.type) {
    case types.UPDATE_ARCHETYPE:
      return { ...state, archetype: action.payload.archetype };
    case types.UPDATE_CLAN:
      return { ...state, clan: action.payload.clan };
    default:
      return state;
  }
};
