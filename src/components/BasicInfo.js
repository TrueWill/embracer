import React, { Component } from 'react';
import Select from 'react-select';

export default class BasicInfo extends Component {
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
