import initialState from './initialState';
import * as types from '../constants/actionTypes';
import type { SettingState, CharacterAction } from '../types';

const settingReducer = (
  state: SettingState = initialState.setting,
  action: CharacterAction
): SettingState => {
  switch (action.type) {
    case types.UPDATE_SETTING:
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

export default settingReducer;
