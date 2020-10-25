import initialState from './initialState';
import * as types from '../constants/actionTypes';

const basicInfoReducer = (state = initialState.character.basicInfo, action) => {
  switch (action.type) {
    case types.UPDATE_ARCHETYPE:
      return { ...state, archetype: action.payload };
    case types.UPDATE_CLAN:
      return { ...state, clan: action.payload };
    default:
      return state;
  }
};

export default basicInfoReducer;
