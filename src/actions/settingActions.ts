import * as types from '../constants/actionTypes';
import { Action } from 'redux';

export interface UpdateSettingAction extends Action<types.UPDATE_SETTING> {
  payload: {
    name: string;
  };
}

export const updateSetting = (name: string): UpdateSettingAction => ({
  type: types.UPDATE_SETTING,
  payload: { name }
});
