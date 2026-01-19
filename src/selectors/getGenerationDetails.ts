import { createSelector } from 'reselect';
import getDots from '../utils/getDots';
import { generationChart } from '../constants/characterOptions';
import { getGeneration } from './simple';
import type { GenerationInfo } from '../types';

const getGenerationDetails = createSelector(
  [getGeneration],
  (generation): GenerationInfo => generationChart[getDots(generation)]
);

export default getGenerationDetails;
