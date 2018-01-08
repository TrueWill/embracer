import { connect } from 'react-redux';
import { setStartingDots } from '../actions/characterCreationActions';
import Disciplines from '../components/Disciplines';
import { disciplineNamesByClan } from '../constants/characterOptions';

const mapStateToProps = (state, ownProps) => {
  const { affinity } = ownProps;

  if (affinity === 'outOfClan') throw new Error('TODO');

  return {
    names: disciplineNamesByClan[state.character.basicInfo.clan] || [],
    displayNameOverride: {},
    traits: state.character.disciplines[affinity]
  };
};

const mapDispatchToProps = {
  setStartingDots
};

export default connect(mapStateToProps, mapDispatchToProps)(Disciplines);
