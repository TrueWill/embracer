import { connect } from 'react-redux';
import { addFlaw, removeFlaw } from '../actions/characterCreationActions';
import meritsFlawsSelector, {
  meritsFlawsOptionsSelector
} from '../utils/meritsFlawsSelector';
import MeritsFlaws from '../components/MeritsFlaws';

const mapStateToProps = state => {
  const optionsMap = meritsFlawsOptionsSelector(state, 'flaws');
  const { selected, availablePoints } = meritsFlawsSelector(state, 'flaws');

  return {
    type: 'flaws',
    optionsMap,
    selected,
    availablePoints
  };
};

const mapDispatchToProps = {
  add: addFlaw,
  remove: removeFlaw
};

export default connect(mapStateToProps, mapDispatchToProps)(MeritsFlaws);
