import { connect } from 'react-redux';
//import { setStartingDots } from '../actions/characterCreationActions';
import Disciplines from '../components/Disciplines';
import { disciplineNamesByClan } from '../constants/characterOptions';

const mapStateToProps = state => {
  return {
    inClanDisciplineNames:
      disciplineNamesByClan[state.character.basicInfo.clan] || [],
    disciplineTraits: state.character.disciplines
  };
};

/*const mapDispatchToProps = {
  setStartingDots
};*/

export default connect(mapStateToProps)(Disciplines);
