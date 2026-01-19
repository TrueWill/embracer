import React from 'react';
import type { SettingState } from '../types';
import { mapKeysToArray } from '../utils/mapUtils';
import { settings } from '../constants/settingOptions';
import Section from './Section';

interface SettingProps {
  setting: SettingState;
  updateSetting: (setting: string) => void;
}

export default function Setting({ setting, updateSetting }: SettingProps) {
  const handleSettingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSetting(e.target.value);
  };

  const settingOptions = mapKeysToArray(settings).map(settingName => (
    <option value={settingName} key={settingName}>
      {settingName}
    </option>
  ));

  return (
    <Section header="Setting">
      <div className="row">
        <div className="col-sm-9">
          <select value={setting.name} onChange={handleSettingChange}>
            {settingOptions}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-9">
          (changing will reset Merits, Flaws, and Backgrounds)
        </div>
      </div>
    </Section>
  );
}
