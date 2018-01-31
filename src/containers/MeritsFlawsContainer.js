import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addMerit,
  removeMerit,
  addFlaw,
  removeFlaw
} from '../actions/characterCreationActions';
import meritsFlawsSelector from '../utils/meritsFlawsSelector';
import MeritsFlaws from '../components/MeritsFlaws';

const mapStateToProps = (state, ownProps) => {
  const { type } = ownProps;

  const { selected, availablePoints } = meritsFlawsSelector(state, type);

  return {
    selected,
    availablePoints
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { type } = ownProps;

  return bindActionCreators(
    type === 'merits'
      ? {
          add: addMerit,
          remove: removeMerit
        }
      : {
          add: addFlaw,
          remove: removeFlaw
        },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MeritsFlaws);
