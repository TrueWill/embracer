import { connect } from 'react-redux';
import { updateSetting } from '../actions/settingActions';
import { getSetting } from '../selectors/simple';
import { IState } from '../reducers/initialState';
import Setting from '../components/Setting';

const mapStateToProps = (state: IState) => ({
  setting: getSetting(state)
});

const mapDispatchToProps = {
  updateSetting
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
