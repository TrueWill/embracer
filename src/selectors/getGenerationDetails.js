import { createSelector } from 'reselect';
import dotSelector from '../utils/dotSelector';
import { generationChart } from '../constants/characterOptions';

const getGeneration = state => state.character.backgrounds.generation;

const getGenerationDetails = createSelector(
  [getGeneration],
  generation => generationChart[dotSelector(generation)]
);

export default getGenerationDetails;
