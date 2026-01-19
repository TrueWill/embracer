import { connect } from 'react-redux';
import type { RootState } from '../types';
import getXP from '../selectors/getXP';
import XP from '../components/XP';

const mapStateToProps = (state: RootState) => getXP(state);

const connector = connect(mapStateToProps);

export default connector(XP);
