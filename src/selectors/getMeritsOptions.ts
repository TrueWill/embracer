import { createSelector } from 'reselect';
import { merits } from '../constants/merits';
import { settings } from '../constants/settingOptions';
import { clans } from '../constants/clanOptions';
import { getSelectedMerits, getSettingName, getClanName } from './simple';

interface MeritOption {
  name: string;
  points: number;
  multiple?: boolean;
}

const getMeritsOptions = createSelector(
  [getSelectedMerits, getSettingName, getClanName],
  (selectedMerits, settingName, clanName): Map<string, { points: number; multiple?: boolean }> => {
    const clanSpecificMerits = clanName ? (clans.get(clanName)?.merits || []) : [];
    const settingSpecificMerits = settings.get(settingName)?.merits || [];

    const options: MeritOption[] = [
      ...settingSpecificMerits,
      ...clanSpecificMerits,
      ...merits
    ];

    const selectedSet = selectedMerits.reduce((acc, cur) => {
      acc.add(cur.name);
      return acc;
    }, new Set<string>());

    return options
      .filter(x => x.multiple || !selectedSet.has(x.name))
      .reduce((acc, cur) => {
        acc.set(cur.name, {
          points: cur.points,
          ...(cur.multiple && { multiple: cur.multiple })
        });
        return acc;
      }, new Map<string, { points: number; multiple?: boolean }>());
  }
);

export default getMeritsOptions;
