import { merits, clanSpecificMerits } from '../constants/merits';
import { flaws } from '../constants/flaws';
import { maxMeritPoints } from '../constants/merits';
import { maxFlawPoints } from '../constants/flaws';

// state is entire state
// type is 'merits' or 'flaws'
const meritsFlawsSelector = (state, type) => {
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
  const isMerits = type === 'merits';

  const selected = isMerits ? state.character.merits : state.character.flaws;

  const selectedSet = selected.reduce((acc, cur) => {
    acc.add(cur.name);
    return acc;
  }, new Set());

  // TODO: working - need test of when clan not set, need test of flaws, probably sort
  const options = isMerits
    ? [...merits, ...clanSpecificMerits[state.character.basicInfo.clan]]
    : flaws;

  return options.filter(x => !selectedSet.has(x.name)).reduce((acc, cur) => {
    acc.set(cur.name, { points: cur.points });
    return acc;
  }, new Map());
};

export default meritsFlawsSelector;
