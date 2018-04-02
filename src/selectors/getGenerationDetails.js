import { createSelector } from 'reselect';
import getDots from '../utils/getDots';
import { generationChart } from '../constants/characterOptions';
import { getGeneration } from './simple';

const getGenerationDetails = createSelector(
  [getGeneration],
  generation => generationChart[getDots(generation)]
);

export default getGenerationDetails;
