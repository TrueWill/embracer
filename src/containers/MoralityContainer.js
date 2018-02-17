import { connect } from 'react-redux';
import { moralityMaxDotsHumanity } from '../constants/characterOptions';
import {
  purchaseMoralityDot,
  unpurchaseMoralityDot
} from '../actions/characterCreationActions';
import dotSelector from '../utils/dotSelector';
import Morality from '../components/Morality';

const mapStateToProps = state => {
  return {
    path: state.character.morality.path,
    level: dotSelector(state.character.morality),
    maxDots: moralityMaxDotsHumanity,
    isEraser: state.mode.isEraser
  };
};

const mapDispatchToProps = {
  purchaseMoralityDot,
  unpurchaseMoralityDot
};

const mergeProps = (stateProps, dispatchProps) => ({
  path: stateProps.path,
  level: stateProps.level,
  maxDots: stateProps.maxDots,
  purchaseOrUnpurchaseDot: stateProps.isEraser
    ? dispatchProps.unpurchaseMoralityDot
    : dispatchProps.purchaseMoralityDot
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Morality
);
