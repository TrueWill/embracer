import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapKeysToArray } from '../utils/mapUtils';
import { clans } from '../constants/clanOptions';

export default class Clan extends Component {
  static propTypes = {
    clan: PropTypes.object.isRequired,
    updateClan: PropTypes.func.isRequired
  };

  handleClanChange = e => {
    this.props.updateClan(e.target.value);
  };

  handleBloodlineChange = e => {
    const clanName = this.props.clan.name;
    const bloodline = e.target.value;

    if (bloodline) {
      const meritPoints = clans.get(clanName).bloodlines.get(bloodline)
        .meritPoints;

      this.props.updateClan(clanName, bloodline, meritPoints);
    } else {
      this.props.updateClan(clanName);
    }
  };

  render() {
    const { clan } = this.props;

    const clanOptions = mapKeysToArray(clans).map(clanName => (
      <option value={clanName} key={clanName}>
        {clanName}
      </option>
    ));

    const bloodlineOptions = [];

    if (clan.name) {
      clans.get(clan.name).bloodlines.forEach((value, key) => {
        bloodlineOptions.push(
          <option value={key} key={key}>
            {`${key} (${value.meritPoints} points)`}
          </option>
        );
      });
    }

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-3">Clan:</div>
          <div className="col-sm-9">
            <select value={clan.name} onChange={this.handleClanChange}>
              <option value="">(not selected)</option>
              {clanOptions}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">Bloodline:</div>
          <div className="col-sm-9">
            <select
              value={clan.bloodline}
              onChange={this.handleBloodlineChange}
            >
              <option value="">(none)</option>
              {bloodlineOptions}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-9 offset-sm-3">
            (changing either will reset Disciplines, Merits, and Morality)
          </div>
        </div>
      </React.Fragment>
    );
  }
}
