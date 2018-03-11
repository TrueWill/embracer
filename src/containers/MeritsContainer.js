import { connect } from 'react-redux';
import { addMerit, removeMerit } from '../actions/characterCreationActions';
import { meritsSelector, meritsOptionsSelector } from '../utils/meritsSelector';
import Merits from '../components/Merits';

const mapStateToProps = state => {
  const optionsMap = meritsOptionsSelector(state);
  const { selected, availablePoints } = meritsSelector(state);

  return {
    optionsMap,
    selected,
    availablePoints
  };
};

const mapDispatchToProps = {
  addMerit,
  removeMerit
};

export default connect(mapStateToProps, mapDispatchToProps)(Merits);
