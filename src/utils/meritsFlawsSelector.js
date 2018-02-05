import { merits, clanSpecificMerits } from '../constants/merits';
import { flaws } from '../constants/flaws';
import { maxMeritPoints } from '../constants/merits';
import { maxFlawPoints } from '../constants/flaws';

// state is entire state
// type is 'merits' or 'flaws'
export const meritsFlawsSelector = (state, type) => {
  let selected;
  let maxPoints;

  if (type === 'merits') {
    selected = state.character.merits;
    maxPoints = maxMeritPoints;
  } else {
    selected = state.character.flaws;
    maxPoints = maxFlawPoints;
  }

  const currentPoints = selected
    .map(x => x.points)
    .reduce((acc, cur) => acc + cur, 0);

  return {
    selected,
    currentPoints,
    availablePoints: maxPoints - currentPoints
  };
};

export const meritsFlawsOptionsSelector = (state, type) => {
  let selected;
  let options;

  if (type === 'merits') {
    selected = state.character.merits;
    const clan = state.character.basicInfo.clan;

    if (clan) {
      options = [...clanSpecificMerits[clan], ...merits];
    } else {
      options = merits;
    }
  } else {
    selected = state.character.flaws;
    options = flaws;
  }

  const selectedSet = selected.reduce((acc, cur) => {
    acc.add(cur.name);
    return acc;
  }, new Set());

  return options.filter(x => !selectedSet.has(x.name)).reduce((acc, cur) => {
    acc.set(cur.name, { points: cur.points });
    return acc;
  }, new Map());
};

export default meritsFlawsSelector;
