import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { archetypes } from '../constants/characterOptions';

interface ArchetypeProps {
  archetype: string;
  updateArchetype: (archetype: string) => void;
}

interface OptionType {
  value: string;
  label: string;
}

export default function Archetype({ archetype, updateArchetype }: ArchetypeProps) {
  const handleArchetypeChange = (val: OptionType | null) => {
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
