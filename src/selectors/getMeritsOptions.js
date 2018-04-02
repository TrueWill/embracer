import { createSelector } from 'reselect';
import { merits } from '../constants/merits';
import { clans } from '../constants/clanOptions';
import { getSelectedMerits, getClanName } from './simple';

const getMeritsOptions = createSelector(
  [getSelectedMerits, getClanName],
  (selectedMerits, clanName) => {
    const options = clanName
      ? [...clans.get(clanName).merits, ...merits]
      : merits;

    const selectedSet = selectedMerits.reduce((acc, cur) => {
      acc.add(cur.name);
      return acc;
    }, new Set());

    return options.filter(x => !selectedSet.has(x.name)).reduce((acc, cur) => {
      acc.set(cur.name, { points: cur.points });
      return acc;
    }, new Map());
  }
);

export default getMeritsOptions;
