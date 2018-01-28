import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addMerit,
  removeMerit,
  addFlaw,
  removeFlaw
} from '../actions/characterCreationActions';
import MeritsFlaws from '../components/MeritsFlaws';

const mapStateToProps = (state, ownProps) => {
  const { type } = ownProps;

  return {
    selected: type === 'merits' ? state.character.merits : state.character.flaws
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
