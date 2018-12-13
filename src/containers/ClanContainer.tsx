import { connect } from 'react-redux';
import { updateClan } from '../actions/characterCreationActions';
import { getClan } from '../selectors/simple';
import Clan from '../components/Clan';

const mapStateToProps = state => ({
  clan: getClan(state)
});

const mapDispatchToProps = {
  updateClan
};

export default connect(mapStateToProps, mapDispatchToProps)(Clan);
