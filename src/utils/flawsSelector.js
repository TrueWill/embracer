import { flaws } from '../constants/flaws';
import { maxFlawPoints } from '../constants/flaws';

export const flawsSelector = state => {
  const selected = state.character.flaws;
  const additionalPoints = 0;
  const maxPoints = maxFlawPoints;

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
