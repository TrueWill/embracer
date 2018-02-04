import { connect } from 'react-redux';
import {
  setStartingDots,
  purchaseDot
} from '../actions/characterCreationActions';
import disciplineNamesSelector from '../utils/disciplineNamesSelector';
import Disciplines from '../components/Disciplines';

const mapStateToProps = (state, ownProps) => {
  const { affinity } = ownProps;

  return {
    names: disciplineNamesSelector(state)[affinity],
    displayNameOverride: {},
    traits: state.character.disciplines[affinity]
  };
};

const mapDispatchToProps = {
  setStartingDots,
  purchaseDot
};

export default connect(mapStateToProps, mapDispatchToProps)(Disciplines);
