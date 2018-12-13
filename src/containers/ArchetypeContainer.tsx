import { connect } from 'react-redux';
import { getArchetype } from '../selectors/simple';
import { updateArchetype } from '../actions/characterCreationActions';
import Archetype from '../components/Archetype';

const mapStateToProps = state => ({
  archetype: getArchetype(state)
});

const mapDispatchToProps = {
  updateArchetype
};

export default connect(mapStateToProps, mapDispatchToProps)(Archetype);
