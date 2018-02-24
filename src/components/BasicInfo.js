import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as options from '../constants/characterOptions';
import Clan from './Clan';

export default class BasicInfo extends Component {
  static propTypes = {
    basicInfo: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
  };

  handleArchetypeChange = val => {
    const value = val ? val.value : '';
    this.props.actions.updateArchetype(value);
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

    return (
      <div>
        Archetype
        <Select.Creatable
          value={basicInfo.archetype}
          multi={false}
          options={archetypeOptions}
          onChange={this.handleArchetypeChange}
        />
        <Clan
          clan={basicInfo.clan}
          updateClan={this.props.actions.updateClan}
        />
      </div>
    );
  }
}
