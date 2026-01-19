import { connect } from 'react-redux';
import type { RootState } from '../types';
import getGenerationDetails from '../selectors/getGenerationDetails';
import Blood from '../components/Blood';

const mapStateToProps = (state: RootState) => {
  const generationDetails = getGenerationDetails(state);

  return {
    bloodPool: generationDetails.bloodPool,
    bloodPerTurn: generationDetails.bloodPerTurn
  };
};

const connector = connect(mapStateToProps);

export default connector(Blood);
