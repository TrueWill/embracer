import { connect } from 'react-redux';
import getGenerationDetails from '../selectors/getGenerationDetails';
import {
  setRank,
  setFocus,
  purchaseOrUnpurchaseDot
} from '../actions/characterCreationActions';
import Attributes from '../components/Attributes';

const mapStateToProps = state => {
  const attributeBonus = getGenerationDetails(state).attributeBonus;

  return {
    attributes: state.character.attributes,
    attributeBonus
  };
};

const mapDispatchToProps = {
  setRank,
  setFocus,
  purchaseOrUnpurchaseDot
};

export default connect(mapStateToProps, mapDispatchToProps)(Attributes);
