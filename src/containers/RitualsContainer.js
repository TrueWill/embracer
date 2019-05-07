import { connect } from 'react-redux';
import { updateRituals } from '../actions/characterCreationActions';
import getRituals from '../selectors/getRituals';
import Rituals from '../components/Rituals';

const mapStateToProps = state => ({
  rituals: getRituals(state)
});

const mapDispatchToProps = {
  updateRituals
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rituals);
