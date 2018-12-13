import { connect } from 'react-redux';
import getGenerationDetails from '../selectors/getGenerationDetails';
import Blood from '../components/Blood';

const mapStateToProps = state => {
  const generationDetails = getGenerationDetails(state);

  return {
    bloodPool: generationDetails.bloodPool,
    bloodPerTurn: generationDetails.bloodPerTurn
  };
};

export default connect(mapStateToProps)(Blood);
