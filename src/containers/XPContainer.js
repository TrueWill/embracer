import { connect } from 'react-redux';
import getXP from '../selectors/getXP';
import XP from '../components/XP';

const mapStateToProps = state => getXP(state);

export default connect(mapStateToProps)(XP);
