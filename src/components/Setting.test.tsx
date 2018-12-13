import React from 'react';
import { shallow } from 'enzyme';
import {
  noop,
  getFirstSelect,
  getSelectedValue,
  getOptionValues,
  changeSelectedValue
} from '../utils/testUtils';
import { settings } from '../constants/settingOptions';
import Setting from './Setting';

const getWrapper = (
  setting = {
    name: 'Camarilla'
  },
  updateSetting = noop
) => shallow(<Setting setting={setting} updateSetting={updateSetting} />);

const getSettingSelect = getFirstSelect;

it('should render without crashing', () => {
  getWrapper();
});

it('should display setting options', () => {
  const wrapper = getWrapper();
  const settingNames = Array.from(settings.keys());

  expect(getOptionValues(getSettingSelect(wrapper))).toEqual(settingNames);
});

it('should select current setting', () => {
  const currentSetting = 'Sabbat';
  const wrapper = getWrapper({ name: currentSetting });

  expect(getSelectedValue(getSettingSelect(wrapper))).toBe(currentSetting);
});

it('should update setting', () => {
  const updateSetting = jest.fn();
  const wrapper = getWrapper(undefined, updateSetting);
  const newSetting = 'Anarch Movement';

  changeSelectedValue(getSettingSelect(wrapper), newSetting);

  expect(updateSetting.mock.calls.length).toBe(1);
  expect(updateSetting.mock.calls[0]).toEqual([newSetting]);
});
