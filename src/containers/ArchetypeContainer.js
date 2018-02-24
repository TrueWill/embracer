import { connect } from 'react-redux';
import { updateArchetype } from '../actions/characterCreationActions';
import Archetype from '../components/Archetype';

const mapStateToProps = state => ({
  archetype: state.character.basicInfo.archetype
});

const mapDispatchToProps = {
  updateArchetype
};

export default connect(mapStateToProps, mapDispatchToProps)(Archetype);
