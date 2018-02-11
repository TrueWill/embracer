import { connect } from 'react-redux';
import generationSelector from '../utils/generationSelector';
import Blood from '../components/Blood';

const mapStateToProps = state => {
  const generationDetails = generationSelector(state);

  return {
    bloodPool: generationDetails.bloodPool,
    bloodPerTurn: generationDetails.bloodPerTurn
  };
};

export default connect(mapStateToProps)(Blood);
