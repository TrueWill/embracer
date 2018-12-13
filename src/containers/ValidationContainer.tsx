import { connect } from 'react-redux';
import getValidation from '../selectors/getValidation';
import Validation from '../components/Validation';

const mapStateToProps = state => {
  return {
    validationState: getValidation(state)
  };
};

export default connect(mapStateToProps)(Validation);
