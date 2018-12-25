import { connect } from 'react-redux';
import getGenerationDetails from '../selectors/getGenerationDetails';
import getFoci from '../selectors/getFoci';
import { getAttributes } from '../selectors/simple';
import {
  setRank,
  setFocus,
  purchaseOrUnpurchaseDot
} from '../actions/characterCreationActions';
import { IState } from '../reducers/initialState';
import Attributes from '../components/Attributes';

const mapStateToProps = (state: IState) => {
  const attributeBonus = getGenerationDetails(state).attributeBonus;
  const foci = getFoci(state);

  return {
    attributes: getAttributes(state),
    attributeBonus,
    foci
  };
};

const mapDispatchToProps = {
  setRank,
  setFocus,
  purchaseOrUnpurchaseDot
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Attributes);
