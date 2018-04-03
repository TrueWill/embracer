import { connect } from 'react-redux';
import { getClanName } from '../selectors/simple';
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

  return {
    categoryTraits: state.character[categoryName],
    adjustAvailable
  };
};

const mapDispatchToProps = {
  setStartingDots,
  purchaseOrUnpurchaseDot
};

export default connect(mapStateToProps, mapDispatchToProps)(TraitCategory);
