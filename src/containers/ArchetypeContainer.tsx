import { connect } from 'react-redux';
import { getArchetype } from '../selectors/simple';
import { updateArchetype } from '../actions/characterCreationActions';
import { IState } from '../reducers/initialState';
import Archetype from '../components/Archetype';

const mapStateToProps = (state: IState) => ({
  archetype: getArchetype(state)
});

const mapDispatchToProps = {
  updateArchetype
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Archetype);
