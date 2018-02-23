import {
  merits,
  clanSpecificMerits,
  moralityMerits,
  moralityMeritBasePoints,
  moralityMeritClanAffinityDiscount
} from '../constants/merits';
import { flaws } from '../constants/flaws';
import { maxMeritPoints } from '../constants/merits';
import { maxFlawPoints } from '../constants/flaws';

// state is entire state
// type is 'merits' or 'flaws'
export const meritsFlawsSelector = (state, type) => {
  let selected;
  let additionalPoints;
  let maxPoints;

  if (type === 'merits') {
    selected = state.character.merits;
    additionalPoints = state.character.morality.meritPoints || 0;
    maxPoints = maxMeritPoints;
  } else {
    selected = state.character.flaws;
    additionalPoints = 0;
    maxPoints = maxFlawPoints;
  }

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

export const moralityMeritsOptionsSelector = state => {
  const clan = state.character.basicInfo.clan;

  return moralityMerits.reduce((acc, cur) => {
    acc.set(cur.name, {
      points:
        moralityMeritBasePoints -
        (cur.clanAffinity && cur.clanAffinity === clan
          ? moralityMeritClanAffinityDiscount
          : 0)
    });
    return acc;
  }, new Map());
};

export default meritsFlawsSelector;
