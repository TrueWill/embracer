import { connect } from 'react-redux';
import { togglePencilEraserMode } from '../actions/modeActions';
import { getIsEraserMode } from '../selectors/simple';
import { IState } from '../reducers/initialState';
import PencilEraser from '../components/PencilEraser';

const mapStateToProps = (state: IState) => ({
  isEraser: getIsEraserMode(state)
});

const mapDispatchToProps = {
  togglePencilEraserMode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PencilEraser);
