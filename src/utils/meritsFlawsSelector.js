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

export default meritsFlawsSelector;
