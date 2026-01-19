import initialState from './initialState';
import * as types from '../constants/actionTypes';
import type { BasicInfo, CharacterAction } from '../types';

const basicInfoReducer = (
  state: BasicInfo = initialState.character.basicInfo,
  action: CharacterAction
): BasicInfo => {
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
