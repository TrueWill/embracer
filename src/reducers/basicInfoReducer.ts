import initialState from './initialState';
import * as types from '../constants/actionTypes';
import type {
  BasicInfo,
  UpdateArchetypeAction,
  UpdateClanAction
} from '../types';

type BasicInfoAction =
  | UpdateArchetypeAction
  | UpdateClanAction;

const basicInfoReducer = (
  state: BasicInfo = initialState.character.basicInfo,
  action: BasicInfoAction
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
