import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/characterCreationActions';
import BasicInfo from '../components/BasicInfo';

const mapStateToProps = state => ({
  basicInfo: state.character.basicInfo
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
