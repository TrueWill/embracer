import { connect } from 'react-redux';
import dotSelector from '../utils/dotSelector';
import { generationChart } from '../constants/characterOptions';
import Blood from '../components/Blood';

const mapStateToProps = state => {
  // TODO: Refactor to selector
  const generation = dotSelector(state.character.backgrounds.generation);
  const generationDetails = generationChart[generation];

  return {
    bloodPool: generationDetails.bloodPool,
    bloodPerTurn: generationDetails.bloodPerTurn
  };
};

export default connect(mapStateToProps)(Blood);
