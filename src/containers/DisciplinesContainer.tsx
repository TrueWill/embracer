import { connect } from 'react-redux';
import type { RootState } from '../types';
import {
  setStartingDots,
  purchaseOrUnpurchaseDot
} from '../actions/characterCreationActions';
import getDisciplineNames from '../selectors/getDisciplineNames';
import { getDisciplines } from '../selectors/simple';
import Disciplines from '../components/Disciplines';

interface OwnProps {
  affinity: 'inClan' | 'outOfClan';
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { affinity } = ownProps;

  return {
    names: getDisciplineNames(state)[affinity],
    displayNameOverride: {},
    traits: getDisciplines(state)[affinity]
  };
};

const mapDispatchToProps = {
  setStartingDots,
  purchaseOrUnpurchaseDot
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Disciplines);
