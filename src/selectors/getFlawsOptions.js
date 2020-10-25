import { createSelector } from 'reselect';
import { flaws } from '../constants/flaws';
import { settings } from '../constants/settingOptions';
import { getSelectedFlaws, getSettingName } from './simple';

const getFlawsOptions = createSelector(
  [getSelectedFlaws, getSettingName],
  (selectedFlaws, settingName) => {
    const settingSpecificFlaws = settings.get(settingName).flaws;

    const options = [...settingSpecificFlaws, ...flaws];

    const selectedSet = selectedFlaws.reduce((acc, cur) => {
      acc.add(cur.name);
      return acc;
    }, new Set());

    return options
      .filter(x => !selectedSet.has(x.name))
      .reduce((acc, cur) => {
        acc.set(cur.name, { points: cur.points });
        return acc;
      }, new Map());
  }
);

export default getFlawsOptions;
