import { connect } from 'react-redux';
import {
  setStartingDots,
  purchaseDot
} from '../actions/characterCreationActions';
import TraitCategory from '../components/TraitCategory';

const mapStateToProps = (state, ownProps) => {
  const { categoryName } = ownProps;

  return {
    categoryTraits: state.character[categoryName]
  };
};

const mapDispatchToProps = {
  setStartingDots,
  purchaseDot
};

export default connect(mapStateToProps, mapDispatchToProps)(TraitCategory);
