import React from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import { archetypes } from '../constants/characterOptions';

export default function Archetype({ archetype, updateArchetype }) {
  const handleArchetypeChange = val => {
    const value = val ? val.value : '';
    updateArchetype(value);
  };

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
          onChange={handleArchetypeChange}
        />
      </div>
    </div>
  );
}

Archetype.propTypes = {
  archetype: PropTypes.string.isRequired,
  updateArchetype: PropTypes.func.isRequired
};
