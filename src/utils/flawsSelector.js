import { flaws } from '../constants/flaws';

export const flawsOptionsSelector = state => {
  const selected = state.character.flaws;
  const options = flaws;

  const selectedSet = selected.reduce((acc, cur) => {
    acc.add(cur.name);
    return acc;
  }, new Set());

  return options.filter(x => !selectedSet.has(x.name)).reduce((acc, cur) => {
    acc.set(cur.name, { points: cur.points });
    return acc;
  }, new Map());
};
