import dotSelector from '../utils/dotSelector';
import { generationChart } from '../constants/characterOptions';

// TODO: Delete after convert xpSelector to reselect
// state is entire state
const generationSelector = state => {
  return generationChart[dotSelector(state.character.backgrounds.generation)];
};

export default generationSelector;
