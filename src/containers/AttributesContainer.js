import { connect } from 'react-redux';
import { setRank, setFocus } from '../actions/characterCreationActions';
import Attributes from '../components/Attributes';

const mapStateToProps = state => ({
  attributes: state.character.attributes
});

const mapDispatchToProps = {
  setRank,
  setFocus
};

export default connect(mapStateToProps, mapDispatchToProps)(Attributes);
