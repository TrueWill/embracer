import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../actions/characterCreationActions';

// Use named export (unconnected) for testing
export class App extends Component {
  defaultArchetypes = ['Architect', 'Bravo']; // TODO
  clans = ['Brujah', 'Toreador', 'Ventrue']; // TODO

  handleArchetypeChange = val => {
    this.props.actions.updateArchetype(val.value);
  };

  handleClanChange = e => {
    this.props.actions.updateClan(e.target.value);
  };

  render() {
    const character = this.props.character;

    let archetypeOptions = this.defaultArchetypes.map(a => ({
      value: a,
      label: a
    }));

    if (
      character.archetype &&
      this.defaultArchetypes.indexOf(character.archetype) === -1
    ) {
      archetypeOptions.push({
        value: character.archetype,
        label: character.archetype
      });
    }

    const clanOptions = this.clans.map(c => (
      <option value={c} key={c}>
        {c}
      </option>
    ));

    return (
      <div>
        Embracer
        <Select.Creatable
          value={character.archetype}
          multi={false}
          options={archetypeOptions}
          onChange={this.handleArchetypeChange}
        />
        <select onChange={this.handleClanChange}>{clanOptions}</select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    character: state.character
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
