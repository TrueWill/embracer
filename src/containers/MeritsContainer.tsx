import { connect } from 'react-redux';
import { addMerit, removeMerit } from '../actions/characterCreationActions';
import getMerits from '../selectors/getMerits';
import getMeritsOptions from '../selectors/getMeritsOptions';
import Merits from '../components/Merits';

const mapStateToProps = state => {
  const optionsMap = getMeritsOptions(state);
  const { selected, availablePoints } = getMerits(state);

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
