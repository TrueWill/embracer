import { merits, clanSpecificMerits } from '../constants/merits';
import { maxMeritPoints } from '../constants/merits';

export const meritsSelector = state => {
  const selected = state.character.merits;
  const additionalPoints = state.character.morality.meritPoints || 0;
  const maxPoints = maxMeritPoints;

  let currentPoints = selected
    .map(x => x.points)
    .reduce((acc, cur) => acc + cur, 0);

  currentPoints += additionalPoints;

  return {
    selected,
    currentPoints,
    availablePoints: maxPoints - currentPoints
  };
};

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
