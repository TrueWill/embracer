import { createSelector } from 'reselect';
import { merits, clanSpecificMerits } from '../constants/merits';

const getSelectedMerits = state => state.character.merits;
const getClan = state => state.character.basicInfo.clan;

const getMeritsOptions = createSelector(
  [getSelectedMerits, getClan],
  (selectedMerits, clan) => {
    const options = clan ? [...clanSpecificMerits[clan], ...merits] : merits;

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
