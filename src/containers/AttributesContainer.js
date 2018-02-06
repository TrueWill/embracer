import { connect } from 'react-redux';
import {
  setRank,
  setFocus,
  purchaseDot
} from '../actions/characterCreationActions';
import Attributes from '../components/Attributes';

const mapStateToProps = state => ({
  attributes: state.character.attributes
});

const mapDispatchToProps = {
  setRank,
  setFocus,
  purchaseDot
};

export default connect(mapStateToProps, mapDispatchToProps)(Attributes);
