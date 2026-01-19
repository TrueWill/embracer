import React from 'react';
import type { ClanInfo } from '../types';
import { mapKeysToArray } from '../utils/mapUtils';
import { clans } from '../constants/clanOptions';

interface BloodlineData {
  meritPoints: number;
  disciplines: string[];
}

interface ClanProps {
  clan: ClanInfo;
  updateClan: (name: string, bloodline?: string, meritPoints?: number) => void;
}

export default function Clan({ clan, updateClan }: ClanProps) {
  const handleClanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateClan(e.target.value);
  };

  const handleBloodlineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const clanName = clan.name;
    const bloodline = e.target.value;

    if (bloodline) {
      const clanData = clans.get(clanName);
      if (clanData) {
        const bloodlineData = clanData.bloodlines.get(bloodline) as BloodlineData | undefined;
        if (bloodlineData) {
          updateClan(clanName, bloodline, bloodlineData.meritPoints);
        }
      }
    } else {
      updateClan(clanName);
    }
  };

  const clanOptions = mapKeysToArray(clans).map(clanName => (
    <option value={clanName} key={clanName}>
      {clanName}
    </option>
  ));

  const bloodlineOptions: React.ReactNode[] = [];

  if (clan.name) {
    const clanData = clans.get(clan.name);
    if (clanData) {
      for (const [key, value] of clanData.bloodlines.entries()) {
        const bloodlineName = key as string;
        const bloodlineData = value as BloodlineData;
        bloodlineOptions.push(
          <option value={bloodlineName} key={bloodlineName}>
            {`${bloodlineName} (${bloodlineData.meritPoints} points)`}
          </option>
        );
      }
    }
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
