import { connect } from 'react-redux';
import { setRank } from '../actions/characterCreationActions';
import Skills from '../components/Skills';

const mapStateToProps = state => ({
  skills: state.character.skills
});

const mapDispatchToProps = {
  setRank
};

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
