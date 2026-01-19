import React, { useState } from 'react';
import type { MeritFlawItem } from '../types';
import Section from './Section';
import DeleteButton from './DeleteButton';
import { getSelectedMeritDescription } from '../utils/meritFlawUtils';
import { maxMeritPoints } from '../constants/merits';

interface MeritOption {
  points: number;
  multiple?: boolean;
}

interface Merit extends MeritOption {
  name: string;
}

const getOptionDescription = (merit: Merit) =>
  `${merit.name}${merit.multiple ? '*' : ''} (${merit.points} point${
    merit.points > 1 ? 's' : ''
  })`;

interface MeritsProps {
  optionsMap: Map<string, MeritOption>;
  selected: MeritFlawItem[];
  availablePoints: number;
  addMerit: (name: string, points: number) => void;
  removeMerit: (name: string) => void;
}

export default function Merits({
  optionsMap,
  selected,
  availablePoints,
  addMerit,
  removeMerit
}: MeritsProps) {
  const [selectedValue, setSelectedValue] = useState('');

  let selectedMerit: Merit | undefined;

  if (selectedValue) {
    const meritOption = optionsMap.get(selectedValue);

    if (meritOption) {
      selectedMerit = { name: selectedValue, ...meritOption };
    } else {
      // Clear out stale state
      setSelectedValue('');
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleAdd = () => {
    if (selectedMerit) {
      addMerit(selectedMerit.name, selectedMerit.points);
      setSelectedValue('');
    }
  };

  const handleRemove = (name: string) => {
    removeMerit(name);
  };

  const selectedList = selected.map(x => (
    <li key={x.name}>
      {getSelectedMeritDescription(x)}{' '}
      <DeleteButton id={x.name} onClick={handleRemove} />
    </li>
  ));

  const optionsList: JSX.Element[] = [];

  optionsMap.forEach((value, key) => {
    const merit: Merit = {
      name: key,
      points: value.points,
      multiple: value.multiple
    };

    optionsList.push(
      <option value={merit.name} key={merit.name}>
        {getOptionDescription(merit)}
      </option>
    );
  });

  return (
    <Section header="Merits">
      <ul>{selectedList}</ul>
      <select
        value={selectedValue}
        onChange={handleSelectChange}
        data-testid="merits"
      >
        <option value="">(not selected)</option>
        {optionsList}
      </select>
      {selectedMerit && selectedMerit.points <= availablePoints && (
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleAdd}
        >
          Add
        </button>
      )}
      <div>* - Can purchase multiple times</div>
      <div>
        Max points: {maxMeritPoints} Available: {availablePoints} (other areas
        have merits)
      </div>
    </Section>
  );
}
