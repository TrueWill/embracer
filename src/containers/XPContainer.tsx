import { connect } from 'react-redux';
import getXP from '../selectors/getXP';
import { IState } from '../reducers/initialState';
import XP from '../components/XP';

const mapStateToProps = (state: IState) => getXP(state);

export default connect(mapStateToProps)(XP);
