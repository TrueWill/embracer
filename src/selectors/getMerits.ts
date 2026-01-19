import { createSelector } from 'reselect';
import { maxMeritPoints } from '../constants/merits';
import {
  getSelectedMerits,
  getMoralityMeritPoints,
  getBloodlineMeritPoints
} from './simple';
import type { MeritsInfo } from '../types';

const getMerits = createSelector(
  [getSelectedMerits, getMoralityMeritPoints, getBloodlineMeritPoints],
  (selectedMerits, moralityMeritPoints, bloodlineMeritPoints): MeritsInfo => {
    const additionalPoints =
      (moralityMeritPoints || 0) + (bloodlineMeritPoints || 0);

    const maxPoints = maxMeritPoints;

    let currentPoints = selectedMerits
      .map(x => x.points * (x.timesPurchased || 1))
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
