import { createSelector } from 'reselect';
import { getSelectedFlaws } from './simple';
import type { FlawsInfo } from '../types';

const getFlaws = createSelector([getSelectedFlaws], (selectedFlaws): FlawsInfo => {
  const additionalPoints = 0;

  let currentPoints = selectedFlaws
    .map(x => x.points)
    .reduce((acc, cur) => acc + cur, 0);

  currentPoints += additionalPoints;

  const maxFlawPoints = 7;
  const availablePoints = maxFlawPoints - currentPoints;

  return {
    selected: selectedFlaws,
    currentPoints,
    availablePoints
  };
});

export default getFlaws;
