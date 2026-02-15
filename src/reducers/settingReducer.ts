import initialState from './initialState';
import * as types from '../constants/actionTypes';
import type { SettingState, UpdateSettingAction } from '../types';

type SettingAction = UpdateSettingAction;

const settingReducer = (
  state: SettingState = initialState.setting,
  action: SettingAction
): SettingState => {
  switch (action.type) {
    case types.UPDATE_SETTING:
      return { ...state, name: action.payload.name };
    default:
      return state;
  }
};

export default settingReducer;
