import { updateSetting } from './settingActions';
import * as types from '../constants/actionTypes';

it('should create an update setting action', () => {
  const action = updateSetting('Sabbat');

  expect(action).toEqual({
    type: types.UPDATE_SETTING,
    payload: { name: 'Sabbat' }
  });
});

it('should pass the setting name through', () => {
  const action = updateSetting('Anarch Movement');

  expect(action.payload.name).toBe('Anarch Movement');
});
