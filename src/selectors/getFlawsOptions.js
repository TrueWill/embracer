import { createSelector } from 'reselect';
import { flaws } from '../constants/flaws';

const getSelectedFlaws = state => state.character.flaws;

const getFlawsOptions = createSelector([getSelectedFlaws], selectedFlaws => {
  const options = flaws;

  const selectedSet = selectedFlaws.reduce((acc, cur) => {
    acc.add(cur.name);
    return acc;
  }, new Set());

  return options.filter(x => !selectedSet.has(x.name)).reduce((acc, cur) => {
    acc.set(cur.name, { points: cur.points });
    return acc;
  }, new Map());
});

export default getFlawsOptions;
