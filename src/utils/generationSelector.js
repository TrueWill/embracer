import dotSelector from '../utils/dotSelector';
import { generationChart } from '../constants/characterOptions';

// state is entire state
const generationSelector = state => {
  return generationChart[dotSelector(state.character.backgrounds.generation)];
};

export default generationSelector;
