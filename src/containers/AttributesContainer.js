import { connect } from 'react-redux';
import {
  setRank,
  setFocus,
  purchaseDot,
  removePurchasedDot
} from '../actions/characterCreationActions';
import Attributes from '../components/Attributes';

const mapStateToProps = state => ({
  attributes: state.character.attributes,
  isEraser: state.mode.isEraser
});

const mapDispatchToProps = {
  setRank,
  setFocus,
  purchaseDot,
  removePurchasedDot
};

const mergeProps = (stateProps, dispatchProps) => ({
  attributes: stateProps.attributes,
  setRank: dispatchProps.setRank,
  setFocus: dispatchProps.setFocus,
  purchaseOrRemovePurchasedDot: stateProps.isEraser
    ? dispatchProps.removePurchasedDot
    : dispatchProps.purchaseDot
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Attributes
);
