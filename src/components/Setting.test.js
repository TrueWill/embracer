import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { noop, getOptionValues } from '../utils/testUtils';
import { settings } from '../constants/settingOptions';
import Setting from './Setting';

const getSettingSelect = () => screen.getByRole('combobox');

it('should display setting options', () => {
  render(
    <Setting
      setting={{
        name: 'Camarilla'
      }}
      updateSetting={noop}
    />
  );

  const settingNames = Array.from(settings.keys());

  expect(getOptionValues(getSettingSelect())).toEqual(settingNames);
});

it('should select current setting', () => {
  const currentSetting = 'Sabbat';

  render(<Setting setting={{ name: currentSetting }} updateSetting={noop} />);

  expect(getSettingSelect()).toHaveValue(currentSetting);
});

it('should update setting', async () => {
  const updateSetting = jest.fn();

  render(
    <Setting
      setting={{
        name: 'Camarilla'
      }}
      updateSetting={updateSetting}
    />
  );

  const newSetting = 'Anarch Movement';

  await userEvent.selectOptions(getSettingSelect(), newSetting);

  expect(updateSetting.mock.calls.length).toBe(1);
  expect(updateSetting.mock.calls[0]).toEqual([newSetting]);
});
