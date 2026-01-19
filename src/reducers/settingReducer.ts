import initialState from './initialState';
import * as types from '../constants/actionTypes';
import type { SettingState } from '../types';

const settingReducer = (
  state: SettingState = initialState.setting,
  action: any
): SettingState => {
  switch (action.type) {
    case types.UPDATE_SETTING:
      return { ...state, name: action.payload.name };
    default:
      return state;
  }
};

export default settingReducer;
