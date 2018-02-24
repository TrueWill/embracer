import { connect } from 'react-redux';
import { updateClan } from '../actions/characterCreationActions';
import Clan from '../components/Clan';

const mapStateToProps = state => ({
  clan: state.character.basicInfo.clan
});

const mapDispatchToProps = {
  updateClan
};

export default connect(mapStateToProps, mapDispatchToProps)(Clan);
