import { connect } from 'react-redux';
import type { RootState } from '../types';
import { addMerit, removeMerit } from '../actions/characterCreationActions';
import getMerits from '../selectors/getMerits';
import getMeritsOptions from '../selectors/getMeritsOptions';
import Merits from '../components/Merits';

const mapStateToProps = (state: RootState) => {
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

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Merits);
