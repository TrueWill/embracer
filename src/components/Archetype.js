import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { archetypes } from '../constants/characterOptions';

export default class Archetype extends Component {
  static propTypes = {
    archetype: PropTypes.string.isRequired,
    updateArchetype: PropTypes.func.isRequired
  };

  handleArchetypeChange = val => {
    const value = val ? val.value : '';
    this.props.updateArchetype(value);
  };

  render() {
    const { archetype } = this.props;

    let archetypeOptions = archetypes.map(a => ({
      value: a,
      label: a
    }));

    if (archetype && archetypes.indexOf(archetype) === -1) {
      archetypeOptions.push({
        value: archetype,
        label: archetype
      });
    }

    return (
      <div>
        Archetype
        <Select.Creatable
          value={archetype}
          multi={false}
          options={archetypeOptions}
          onChange={this.handleArchetypeChange}
        />
      </div>
    );
  }
}
