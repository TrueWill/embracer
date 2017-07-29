import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../actions/characterCreationActions';

class App extends Component {
  defaultArchetypes = ['Architect', 'Bravo'];  // TODO

  handleChange = (val) => {
    this.props.actions.updateArchetype(val.value);
  }

  render() {
    const character = this.props.character;

    // TODO: Bug if create new item
    const options = this.defaultArchetypes.map(a => ({value: a, label: a}));

    return (
      <div>
        Embracer
        <Select.Creatable value={character.archetype} multi={false} options={options} onChange={this.handleChange} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    character: state.character
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
