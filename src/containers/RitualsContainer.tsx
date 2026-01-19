import { connect } from 'react-redux';
import type { RootState } from '../types';
import { updateRituals } from '../actions/characterCreationActions';
import getRituals from '../selectors/getRituals';
import Rituals from '../components/Rituals';

const mapStateToProps = (state: RootState) => ({
  rituals: getRituals(state)
});

const mapDispatchToProps = {
  updateRituals
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Rituals);
