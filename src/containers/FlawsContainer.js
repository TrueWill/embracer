import { connect } from 'react-redux';
import { addFlaw, removeFlaw } from '../actions/characterCreationActions';
import getFlaws from '../selectors/getFlaws';
import getFlawsOptions from '../selectors/getFlawsOptions';
import Flaws from '../components/Flaws';

const mapStateToProps = state => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Flaws);
