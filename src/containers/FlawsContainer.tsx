import { connect } from 'react-redux';
import type { RootState } from '../types';
import { addFlaw, removeFlaw } from '../actions/characterCreationActions';
import getFlaws from '../selectors/getFlaws';
import getFlawsOptions from '../selectors/getFlawsOptions';
import Flaws from '../components/Flaws';

const mapStateToProps = (state: RootState) => {
  const optionsMap = getFlawsOptions(state);
  const { selected, availablePoints } = getFlaws(state);

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

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Flaws);
