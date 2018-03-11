import { connect } from 'react-redux';
import { addFlaw, removeFlaw } from '../actions/characterCreationActions';
import { flawsSelector, flawsOptionsSelector } from '../utils/flawsSelector';
import Flaws from '../components/Flaws';

const mapStateToProps = state => {
  const optionsMap = flawsOptionsSelector(state);
  const { selected, availablePoints } = flawsSelector(state);

  return {
    optionsMap,
    selected,
    availablePoints
  };
};

const mapDispatchToProps = {
  addFlaw,
  removeFlaw
};

export default connect(mapStateToProps, mapDispatchToProps)(Flaws);
