import React, { useState } from 'react';
import type { MeritFlawItem } from '../types';
import Section from './Section';
import DeleteButton from './DeleteButton';
import { getFlawDescription } from '../utils/meritFlawUtils';
import { maxFlawPoints } from '../constants/flaws';

interface FlawOption {
  points: number;
}

interface Flaw extends FlawOption {
  name: string;
}

interface FlawsProps {
  optionsMap: Map<string, FlawOption>;
  selected: MeritFlawItem[];
  availablePoints: number;
  addFlaw: (name: string, points: number) => void;
  removeFlaw: (name: string) => void;
}

export default function Flaws({
  optionsMap,
  selected,
  availablePoints,
  addFlaw,
  removeFlaw
}: FlawsProps) {
  const [selectedValue, setSelectedValue] = useState('');

  let selectedFlaw: Flaw | undefined;

  if (selectedValue) {
    const flawOption = optionsMap.get(selectedValue);

    if (flawOption) {
      selectedFlaw = { name: selectedValue, ...flawOption };
    } else {
      // Clear out stale state
      setSelectedValue('');
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleAdd = () => {
    if (selectedFlaw) {
      addFlaw(selectedFlaw.name, selectedFlaw.points);
      setSelectedValue('');
    }
  };

  const handleRemove = (name: string) => {
    removeFlaw(name);
  };

  const selectedList = selected.map(x => (
    <li key={x.name}>
      {getFlawDescription(x)}{' '}
      <DeleteButton id={x.name} onClick={handleRemove} />
    </li>
  ));

  const optionsList: React.ReactNode[] = [];

  optionsMap.forEach((value, key) => {
    const flaw: Flaw = {
      name: key,
      points: value.points
    };

    optionsList.push(
      <option value={flaw.name} key={flaw.name}>
        {getFlawDescription(flaw)}
      </option>
    );
  });

  return (
    <Section header="Flaws">
      <ul>{selectedList}</ul>
      <select
        value={selectedValue}
        onChange={handleSelectChange}
        data-testid="flaws"
      >
        <option value="">(not selected)</option>
        {optionsList}
      </select>
      {selectedFlaw && selectedFlaw.points <= availablePoints && (
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleAdd}
        >
          Add
        </button>
      )}
      <div>
        Max points: {maxFlawPoints} Available: {availablePoints}
      </div>
    </Section>
  );
}
