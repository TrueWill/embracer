import { connect } from 'react-redux';
import { setStartingDots } from '../actions/characterCreationActions';
import Skills from '../components/Skills';

const mapStateToProps = state => ({
  skills: state.character.skills
});

const mapDispatchToProps = {
  setStartingDots
};

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
