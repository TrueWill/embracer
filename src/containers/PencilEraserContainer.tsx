import { connect } from 'react-redux';
import type { RootState } from '../types';
import { togglePencilEraserMode } from '../actions/modeActions';
import { getIsEraserMode } from '../selectors/simple';
import PencilEraser from '../components/PencilEraser';

const mapStateToProps = (state: RootState) => ({
  isEraser: getIsEraserMode(state)
});

const mapDispatchToProps = {
  togglePencilEraserMode
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PencilEraser);
