import { connect } from 'react-redux';
import { setStartingDots } from '../actions/characterCreationActions';
import TraitCategory from '../components/TraitCategory';

const mapStateToProps = (state, ownProps) => {
  const { categoryName } = ownProps;

  return {
    categoryTraits: state.character[categoryName]
  };
};

const mapDispatchToProps = {
  setStartingDots
};

export default connect(mapStateToProps, mapDispatchToProps)(TraitCategory);
