import { connect } from 'react-redux';
import getValidation from '../selectors/getValidation';
import { IState } from '../reducers/initialState';
import Validation from '../components/Validation';

const mapStateToProps = (state: IState) => {
  return {
    validationState: getValidation(state)
  };
};

export default connect(mapStateToProps)(Validation);
