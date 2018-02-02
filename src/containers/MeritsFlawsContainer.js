import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addMerit,
  removeMerit,
  addFlaw,
  removeFlaw
} from '../actions/characterCreationActions';
import meritsFlawsSelector, { meritsFlawsOptionsSelector } from '../utils/meritsFlawsSelector';
import MeritsFlaws from '../components/MeritsFlaws';

const mapStateToProps = (state, ownProps) => {
  const { type } = ownProps;

  const optionsMap = meritsFlawsOptionsSelector(state, type);
  const { selected, availablePoints } = meritsFlawsSelector(state, type);

  return {
    optionsMap,
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
