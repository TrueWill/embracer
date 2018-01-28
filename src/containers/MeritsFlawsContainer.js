import { connect } from 'react-redux';
import {
  addMeritFlaw,
  removeMeritFlaw
} from '../actions/characterCreationActions';
import MeritsFlaws from '../components/MeritsFlaws';

const mapStateToProps = (state, ownProps) => {
  const { options } = ownProps;

  return {
    options,
    selected: state.character.meritsFlaws
  };
};

const mapDispatchToProps = {
  addMeritFlaw,
  removeMeritFlaw
};

export default connect(mapStateToProps, mapDispatchToProps)(MeritsFlaws);
