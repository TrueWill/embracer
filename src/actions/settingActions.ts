import * as types from '../constants/actionTypes';
import { UpdateSettingAction } from '../types';

export const updateSetting = (name: string): UpdateSettingAction => ({
  type: types.UPDATE_SETTING,
  payload: name
});
