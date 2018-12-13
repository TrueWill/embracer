import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/lib/Creatable';
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

    const value = archetype
      ? {
          value: archetype,
          label: archetype
        }
      : null;

    const archetypeOptions = archetypes.map(a => ({
      value: a,
      label: a
    }));

    return (
      <div className="row">
        <div className="col-sm-3">Archetype:</div>
        <div className="col-sm-9">
          <CreatableSelect
            isClearable
            value={value}
            options={archetypeOptions}
            onChange={this.handleArchetypeChange}
          />
        </div>
      </div>
    );
  }
}
