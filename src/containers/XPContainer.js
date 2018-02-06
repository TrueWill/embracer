import { connect } from 'react-redux';
import xpSelector from '../utils/xpSelector';
import XP from '../components/XP';

const mapStateToProps = state => xpSelector(state);

export default connect(mapStateToProps)(XP);
