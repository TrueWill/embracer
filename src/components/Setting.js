import React from 'react';
import PropTypes from 'prop-types';
import { mapKeysToArray } from '../utils/mapUtils';
import { settings } from '../constants/settingOptions';
import Section from './Section';

export default function Setting({ setting, updateSetting }) {
  const handleSettingChange = e => {
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

Setting.propTypes = {
  setting: PropTypes.object.isRequired,
  updateSetting: PropTypes.func.isRequired
};
