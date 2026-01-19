import { connect } from 'react-redux';
import type { RootState } from '../types';
import { updateSetting } from '../actions/settingActions';
import { getSetting } from '../selectors/simple';
import Setting from '../components/Setting';

const mapStateToProps = (state: RootState) => ({
  setting: getSetting(state)
});

const mapDispatchToProps = {
  updateSetting
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Setting);
