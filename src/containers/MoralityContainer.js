import { connect } from 'react-redux';
import {
  humanity,
  moralityMaxDotsHumanity,
  moralityMaxDotsPath
} from '../constants/characterOptions';
import {
  purchaseMoralityDot,
  unpurchaseMoralityDot,
  updateMorality
} from '../actions/characterCreationActions';
import dotSelector from '../utils/dotSelector';
import meritsFlawsSelector, { moralityMeritsOptionsSelector } from '../utils/meritsFlawsSelector';
import Morality from '../components/Morality';

const mapStateToProps = state => {
  const path = state.character.morality.path;

  const maxDots =
    path === humanity ? moralityMaxDotsHumanity : moralityMaxDotsPath;

  const { availablePoints } = meritsFlawsSelector(state, 'merits');

  return {
    optionsMap: moralityMeritsOptionsSelector(state),
    availablePoints,
    path,
    level: dotSelector(state.character.morality),
    maxDots,
    isEraser: state.mode.isEraser
  };
};

const mapDispatchToProps = {
  purchaseMoralityDot,
  unpurchaseMoralityDot,
  updateMorality
};

const mergeProps = (stateProps, dispatchProps) => ({
  optionsMap: stateProps.optionsMap,
  availablePoints: stateProps.availablePoints,
  path: stateProps.path,
  level: stateProps.level,
  maxDots: stateProps.maxDots,
  purchaseOrUnpurchaseDot: stateProps.isEraser
    ? dispatchProps.unpurchaseMoralityDot
    : dispatchProps.purchaseMoralityDot,
  updateMorality: dispatchProps.updateMorality
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Morality
);
