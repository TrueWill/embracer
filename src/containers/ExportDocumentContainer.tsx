import { connect } from 'react-redux';
import type { RootState } from '../types';
import ExportDocument from '../components/ExportDocument';

const mapStateToProps = (state: RootState) => ({
  state
});

const connector = connect(mapStateToProps);

export default connector(ExportDocument);
