import { connect } from 'react-redux';
import {
  setRank,
  setFocus,
  purchaseDot,
  unpurchaseDot
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
  unpurchaseDot
};

const mergeProps = (stateProps, dispatchProps) => ({
  attributes: stateProps.attributes,
  setRank: dispatchProps.setRank,
  setFocus: dispatchProps.setFocus,
  purchaseOrUnpurchaseDot: stateProps.isEraser
    ? dispatchProps.unpurchaseDot
    : dispatchProps.purchaseDot
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Attributes
);
