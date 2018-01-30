import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addMerit,
  removeMerit,
  addFlaw,
  removeFlaw
} from '../actions/characterCreationActions';
import { maxMeritPoints } from '../constants/merits';
import { maxFlawPoints } from '../constants/flaws';
import MeritsFlaws from '../components/MeritsFlaws';

const mapStateToProps = (state, ownProps) => {
  const { type } = ownProps;

  let selected, maxPoints;

  if (type === 'merits') {
    selected = state.character.merits;
    maxPoints = maxMeritPoints;
  } else {
    selected = state.character.flaws;
    maxPoints = maxFlawPoints;
  }

  const currentPoints = selected
    .map(x => x.points)
    .reduce((acc, cur) => acc + cur, 0);

  return {
    selected,
    availablePoints: maxPoints - currentPoints
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
