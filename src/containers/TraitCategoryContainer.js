import { connect } from 'react-redux';
import getSpecificBackgrounds from '../selectors/getSpecificBackgrounds';
import { getCharacter, getClanName } from '../selectors/simple';
import {
  setStartingDots,
  purchaseOrUnpurchaseDot
} from '../actions/characterCreationActions';
import TraitCategory from '../components/TraitCategory';

const mapStateToProps = (state, ownProps) => {
  const { categoryName } = ownProps;

  let adjustAvailable;

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TraitCategory);
