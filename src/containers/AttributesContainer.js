import { connect } from 'react-redux';
import generationSelector from '../utils/generationSelector';
import {
  setRank,
  setFocus,
  purchaseDot,
  unpurchaseDot
} from '../actions/characterCreationActions';
import Attributes from '../components/Attributes';

const mapStateToProps = state => {
  const attributeBonus = generationSelector(state).attributeBonus;

  return {
    attributes: state.character.attributes,
    attributeBonus,
    isEraser: state.mode.isEraser
  };
};

const mapDispatchToProps = {
  setRank,
  setFocus,
  purchaseDot,
  unpurchaseDot
};

const mergeProps = (stateProps, dispatchProps) => ({
  attributes: stateProps.attributes,
  attributeBonus: stateProps.attributeBonus,
  setRank: dispatchProps.setRank,
  setFocus: dispatchProps.setFocus,
  purchaseOrUnpurchaseDot: stateProps.isEraser
    ? dispatchProps.unpurchaseDot
    : dispatchProps.purchaseDot
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Attributes
);
