import { connect } from 'react-redux';
import getGenerationDetails from '../selectors/getGenerationDetails';
import { IState } from '../reducers/initialState';
import Blood from '../components/Blood';

const mapStateToProps = (state: IState) => {
  const generationDetails = getGenerationDetails(state);

  return {
    bloodPool: generationDetails.bloodPool,
    bloodPerTurn: generationDetails.bloodPerTurn
  };
};

export default connect(mapStateToProps)(Blood);
