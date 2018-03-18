import { createSelector } from 'reselect';
import { merits, clanSpecificMerits } from '../constants/merits';

const getSelectedMerits = state => state.character.merits;
const getClanName = state => state.character.basicInfo.clan.name;

const getMeritsOptions = createSelector(
  [getSelectedMerits, getClanName],
  (selectedMerits, clanName) => {
    const options = clanName
      ? [...clanSpecificMerits[clanName], ...merits]
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
