import { connect } from 'react-redux';
import type { RootState } from '../types';
import {
  humanity,
  moralityMaxDotsHumanity,
  moralityMaxDotsPath
} from '../constants/characterOptions';
import {
  purchaseOrUnpurchaseMoralityDot,
  updateMoralityIfPointsAvailable
} from '../actions/characterCreationActions';
import getDots from '../utils/getDots';
import getMoralityMeritsOptions from '../selectors/getMoralityMeritsOptions';
import { getMorality } from '../selectors/simple';
import Morality from '../components/Morality';

const mapStateToProps = (state: RootState) => {
  const morality = getMorality(state);
  const path = morality.path;

  const maxDots =
    path === humanity ? moralityMaxDotsHumanity : moralityMaxDotsPath;

  return {
    optionsMap: getMoralityMeritsOptions(state),
    path,
    level: getDots(morality),
    maxDots
  };
};

const mapDispatchToProps = {
  purchaseOrUnpurchaseMoralityDot,
  updateMoralityIfPointsAvailable
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Morality);
