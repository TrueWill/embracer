import { connect } from 'react-redux';
import type { RootState } from '../types';
import getValidation from '../selectors/getValidation';
import Validation from '../components/Validation';

const mapStateToProps = (state: RootState) => {
  return {
    validationState: getValidation(state)
  };
};

const connector = connect(mapStateToProps);

export default connector(Validation);
