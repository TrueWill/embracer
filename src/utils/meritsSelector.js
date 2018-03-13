import { merits, clanSpecificMerits } from '../constants/merits';

export const meritsOptionsSelector = state => {
  const selected = state.character.merits;
  const clan = state.character.basicInfo.clan;

  const options = clan ? [...clanSpecificMerits[clan], ...merits] : merits;

  const selectedSet = selected.reduce((acc, cur) => {
    acc.add(cur.name);
    return acc;
  }, new Set());

  return options.filter(x => !selectedSet.has(x.name)).reduce((acc, cur) => {
    acc.set(cur.name, { points: cur.points });
    return acc;
  }, new Map());
};
