import { createSelector } from 'reselect';
import { merits } from '../constants/merits';
import { settings } from '../constants/settingOptions';
import { clans } from '../constants/clanOptions';
import { getSelectedMerits, getSettingName, getClanName } from './simple';

const getMeritsOptions = createSelector(
  [getSelectedMerits, getSettingName, getClanName],
  (selectedMerits, settingName, clanName) => {
    const clanSpecificMerits = clanName ? clans.get(clanName).merits : [];
    const settingSpecificMerits = settings.get(settingName).merits;

    const options = [
      ...settingSpecificMerits,
      ...clanSpecificMerits,
      ...merits
    ];

    const selectedSet = selectedMerits.reduce((acc, cur) => {
      acc.add(cur.name);
      return acc;
    }, new Set());

    return options
      .filter(x => x.multiple || !selectedSet.has(x.name))
      .reduce((acc, cur) => {
        acc.set(cur.name, {
          points: cur.points,
          ...(cur.multiple && { multiple: cur.multiple })
        });
        return acc;
      }, new Map());
  }
);

export default getMeritsOptions;
