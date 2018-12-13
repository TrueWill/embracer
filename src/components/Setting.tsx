import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapKeysToArray } from '../utils/mapUtils';
import { settings } from '../constants/settingOptions';
import Section from './Section';

export default class Setting extends Component {
  static propTypes = {
    setting: PropTypes.object.isRequired,
    updateSetting: PropTypes.func.isRequired
  };

  handleSettingChange = e => {
    this.props.updateSetting(e.target.value);
  };

  render() {
    const { setting } = this.props;

    const settingOptions = mapKeysToArray(settings).map(settingName => (
      <option value={settingName} key={settingName}>
        {settingName}
      </option>
    ));

    return (
      <Section header="Setting">
        <div className="row">
          <div className="col-sm-9">
            <select value={setting.name} onChange={this.handleSettingChange}>
              {settingOptions}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-9">(changing will reset Merits and Flaws)</div>
        </div>
      </Section>
    );
  }
}
