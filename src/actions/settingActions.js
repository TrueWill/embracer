import * as types from '../constants/actionTypes';

export const updateSetting = name => ({
  type: types.UPDATE_SETTING,
  payload: { name }
});
