import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as options from '../constants/characterOptions';

export default class BasicInfo extends Component {
  static propTypes = {
    character: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
  };

  handleArchetypeChange = val => {
    this.props.actions.updateArchetype(val.value);
  };

  handleClanChange = e => {
    this.props.actions.updateClan(e.target.value);
  };

  render() {
    const character = this.props.character;

    let archetypeOptions = options.archetypes.map(a => ({
      value: a,
      label: a
    }));

    if (
      character.archetype &&
      options.archetypes.indexOf(character.archetype) === -1
    ) {
      archetypeOptions.push({
        value: character.archetype,
        label: character.archetype
      });
    }

    const clanOptions = options.clans.map(c => (
      <option value={c} key={c}>
        {c}
      </option>
    ));

    return (
      <div>
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
