import { connect } from 'react-redux';
import ExportDocument from '../components/ExportDocument';

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(ExportDocument);
