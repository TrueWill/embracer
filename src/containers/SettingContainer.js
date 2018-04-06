import { connect } from 'react-redux';
import { updateSetting } from '../actions/settingActions';
import Setting from '../components/Setting';

const mapStateToProps = state => ({
  setting: state.setting
});

const mapDispatchToProps = {
  updateSetting
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
