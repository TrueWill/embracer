import React from 'react';
import PropTypes from 'prop-types';
import { mapKeysToArray } from '../utils/mapUtils';
import { clans } from '../constants/clanOptions';

export default function Clan({ clan, updateClan }) {
  const handleClanChange = e => {
    updateClan(e.target.value);
  };

  const handleBloodlineChange = e => {
    const clanName = clan.name;
    const bloodline = e.target.value;

    if (bloodline) {
      const meritPoints = clans.get(clanName).bloodlines.get(bloodline)
        .meritPoints;

      updateClan(clanName, bloodline, meritPoints);
    } else {
      updateClan(clanName);
    }
  };

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
          <select
            value={clan.name}
            onChange={handleClanChange}
            data-testid="clan"
          >
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
            onChange={handleBloodlineChange}
            data-testid="bloodline"
          >
            <option value="">(none)</option>
            {bloodlineOptions}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-9 offset-sm-3">
          (changing either will reset Disciplines, Merits, and Morality)
          <br />
          (selecting Caitiff will also reset Backgrounds)
          <br />
          (STs may require Rarity Merits for some clans/bloodlines)
        </div>
      </div>
    </React.Fragment>
  );
}

Clan.propTypes = {
  clan: PropTypes.object.isRequired,
  updateClan: PropTypes.func.isRequired
};
