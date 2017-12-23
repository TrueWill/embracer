import { connect } from 'react-redux';
import { setRank } from '../actions/characterCreationActions';
import Attributes from '../components/Attributes';

const mapStateToProps = state => ({
  attributes: state.character.attributes
});

const mapDispatchToProps = {
  setRank
};

export default connect(mapStateToProps, mapDispatchToProps)(Attributes);
