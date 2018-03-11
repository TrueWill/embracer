import { connect } from 'react-redux';
import { addMerit, removeMerit } from '../actions/characterCreationActions';
import meritsFlawsSelector, {
  meritsFlawsOptionsSelector
} from '../utils/meritsFlawsSelector';
import MeritsFlaws from '../components/MeritsFlaws';

const mapStateToProps = state => {
  const optionsMap = meritsFlawsOptionsSelector(state, 'merits');
  const { selected, availablePoints } = meritsFlawsSelector(state, 'merits');

  return {
    type: 'merits',
    optionsMap,
    selected,
    availablePoints
  };
};

const mapDispatchToProps = {
  add: addMerit,
  remove: removeMerit
};

export default connect(mapStateToProps, mapDispatchToProps)(MeritsFlaws);
