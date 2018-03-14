import { createSelector } from 'reselect';
import { maxMeritPoints } from '../constants/merits';

const getSelectedMerits = state => state.character.merits;
const getMoralityMeritPoints = state => state.character.morality.meritPoints;

const getMerits = createSelector(
  [getSelectedMerits, getMoralityMeritPoints],
  (selectedMerits, moralityMeritPoints) => {
    const additionalPoints = moralityMeritPoints || 0;
    const maxPoints = maxMeritPoints;

    let currentPoints = selectedMerits
      .map(x => x.points)
      .reduce((acc, cur) => acc + cur, 0);

    currentPoints += additionalPoints;

    return {
      selected: selectedMerits,
      currentPoints,
      availablePoints: maxPoints - currentPoints
    };
  }
);

export default getMerits;
