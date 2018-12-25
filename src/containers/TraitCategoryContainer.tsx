import { connect } from 'react-redux';
import { getCharacter, getClanName } from '../selectors/simple';
import {
  setStartingDots,
  purchaseOrUnpurchaseDot
} from '../actions/characterCreationActions';
import { AvailableStartingDots } from '../constants/characterOptions';
import { IState } from '../reducers/initialState';
import TraitCategory from '../components/TraitCategory';

const mapStateToProps = (state: IState, ownProps) => {
  const { categoryName } = ownProps;

  let adjustAvailable: (
    a: AvailableStartingDots,
    t?: string,
    d?: number
  ) => AvailableStartingDots;

  if (categoryName === 'backgrounds' && getClanName(state) === 'Caitiff') {
    adjustAvailable = (
      availableStartingDots: AvailableStartingDots,
      traitName?: string,
      dotsPurchased?: number
    ): AvailableStartingDots => {
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
    categoryTraits: getCharacter(state)[categoryName],
    adjustAvailable
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
