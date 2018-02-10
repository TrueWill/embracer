import { connect } from 'react-redux';
import {
  setStartingDots,
  purchaseDot,
  unpurchaseDot
} from '../actions/characterCreationActions';
import TraitCategory from '../components/TraitCategory';

const mapStateToProps = (state, ownProps) => {
  const { categoryName } = ownProps;

  return {
    categoryTraits: state.character[categoryName],
    isEraser: state.mode.isEraser
  };
};

const mapDispatchToProps = {
  setStartingDots,
  purchaseDot,
  unpurchaseDot
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  categoryTraits: stateProps.categoryTraits,
  setStartingDots: dispatchProps.setStartingDots,
  purchaseOrUnpurchaseDot: stateProps.isEraser
    ? dispatchProps.unpurchaseDot
    : dispatchProps.purchaseDot
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  TraitCategory
);
