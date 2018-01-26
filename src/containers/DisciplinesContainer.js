import { connect } from 'react-redux';
import { setStartingDots } from '../actions/characterCreationActions';
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
  setStartingDots
};

export default connect(mapStateToProps, mapDispatchToProps)(Disciplines);
