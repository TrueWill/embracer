import * as types from '../constants/actionTypes';
import { Action } from '../types';

export const updateSetting: (
  name: string
) => Action<{ name: string }> = name => ({
  type: types.UPDATE_SETTING,
  payload: { name }
});
