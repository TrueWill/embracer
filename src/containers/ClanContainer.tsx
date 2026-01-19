import { connect } from 'react-redux';
import type { RootState } from '../types';
import { updateClan } from '../actions/characterCreationActions';
import { getClan } from '../selectors/simple';
import Clan from '../components/Clan';

const mapStateToProps = (state: RootState) => ({
  clan: getClan(state)
});

const mapDispatchToProps = {
  updateClan
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Clan);
