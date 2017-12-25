import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as options from '../constants/characterOptions';

export default class BasicInfo extends Component {
  static propTypes = {
    basicInfo: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
  };

  handleArchetypeChange = val => {
    this.props.actions.updateArchetype(val.value);
  };

  handleClanChange = e => {
    this.props.actions.updateClan(e.target.value);
  };

  render() {
    const basicInfo = this.props.basicInfo;

    let archetypeOptions = options.archetypes.map(a => ({
      value: a,
      label: a
    }));

    if (
      basicInfo.archetype &&
      options.archetypes.indexOf(basicInfo.archetype) === -1
    ) {
      archetypeOptions.push({
        value: basicInfo.archetype,
        label: basicInfo.archetype
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
          value={basicInfo.archetype}
          multi={false}
          options={archetypeOptions}
          onChange={this.handleArchetypeChange}
        />
        <select onChange={this.handleClanChange}>{clanOptions}</select>
      </div>
    );
  }
}
