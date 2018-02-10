import { connect } from 'react-redux';
import { togglePencilEraserMode } from '../actions/modeActions';
import PencilEraser from '../components/PencilEraser';

const mapStateToProps = state => ({
  isEraser: state.mode.isEraser
});

const mapDispatchToProps = {
  togglePencilEraserMode
};

export default connect(mapStateToProps, mapDispatchToProps)(PencilEraser);
