import { connect } from 'react-redux';
import type { RootState, AvailableStartingDot } from '../types';
import getSpecificBackgrounds from '../selectors/getSpecificBackgrounds';
import { getCharacter, getClanName } from '../selectors/simple';
import {
  setStartingDots,
  purchaseOrUnpurchaseDot
} from '../actions/characterCreationActions';
import TraitCategory from '../components/TraitCategory';

interface OwnProps {
  categoryName: keyof import('../types').CharacterState;
  traitNames: string[];
  traitDisplayNameOverride: { [key: string]: string };
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { categoryName } = ownProps;

  let adjustAvailable: (
    availableStartingDots: AvailableStartingDot[],
    traitName: string,
    dotsPurchased: number
  ) => AvailableStartingDot[];

  if (categoryName === 'backgrounds' && getClanName(state) === 'Caitiff') {
    adjustAvailable = (availableStartingDots, traitName, dotsPurchased) => {
      if (traitName === 'generation') {
        const maxStartingDots = dotsPurchased ? 1 : 2;
        return availableStartingDots.filter(a => a.dots <= maxStartingDots);
      } else {
        return availableStartingDots;
      }
    };
  } else {
    adjustAvailable = availableStartingDots => availableStartingDots;
  }

  const specificNames =
    categoryName === 'backgrounds' ? getSpecificBackgrounds(state) : [];

  return {
    categoryTraits: getCharacter(state)[categoryName],
    adjustAvailable,
    specificNames
  };
};

const mapDispatchToProps = {
  setStartingDots,
  purchaseOrUnpurchaseDot
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(TraitCategory);
