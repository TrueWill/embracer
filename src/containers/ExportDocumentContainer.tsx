import { connect } from 'react-redux';
import { IState } from '../reducers/initialState';
import ExportDocument from '../components/ExportDocument';

const mapStateToProps = (state: IState) => ({
  state
});

export default connect(mapStateToProps)(ExportDocument);
