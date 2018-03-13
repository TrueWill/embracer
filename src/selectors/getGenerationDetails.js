import { createSelector } from 'reselect';
import getDots from '../utils/getDots';
import { generationChart } from '../constants/characterOptions';

const getGeneration = state => state.character.backgrounds.generation;

const getGenerationDetails = createSelector(
  [getGeneration],
  generation => generationChart[getDots(generation)]
);

export default getGenerationDetails;
