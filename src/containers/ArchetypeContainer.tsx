import { connect } from 'react-redux';
import type { RootState } from '../types';
import { getArchetype } from '../selectors/simple';
import { updateArchetype } from '../actions/characterCreationActions';
import Archetype from '../components/Archetype';

const mapStateToProps = (state: RootState) => ({
  archetype: getArchetype(state)
});

const mapDispatchToProps = {
  updateArchetype
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Archetype);
