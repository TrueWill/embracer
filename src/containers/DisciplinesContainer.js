import { connect } from 'react-redux';
import {
  setStartingDots,
  purchaseDot,
  unpurchaseDot
} from '../actions/characterCreationActions';
import disciplineNamesSelector from '../utils/disciplineNamesSelector';
import Disciplines from '../components/Disciplines';

const mapStateToProps = (state, ownProps) => {
  const { affinity } = ownProps;

  return {
    names: disciplineNamesSelector(state)[affinity],
    displayNameOverride: {},
    traits: state.character.disciplines[affinity],
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
  names: stateProps.names,
  displayNameOverride: stateProps.displayNameOverride,
  traits: stateProps.traits,
  setStartingDots: dispatchProps.setStartingDots,
  purchaseOrUnpurchaseDot: stateProps.isEraser
    ? dispatchProps.unpurchaseDot
    : dispatchProps.purchaseDot
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Disciplines
);
