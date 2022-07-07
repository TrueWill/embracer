import { ChangeEvent, useState } from 'react';
import Section from './Section';
import DeleteButton from './DeleteButton';
import { getFlawDescription } from '../utils/meritFlawUtils';
import { maxFlawPoints } from '../constants/flaws';

interface FlawsProps {
  optionsMap: Map<
    string,
    {
      readonly points: number;
    }
  >;
  selected: {
    name: string;
    points: number;
  }[];
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
}: FlawsProps): JSX.Element {
  const [selectedValue, setSelectedValue] = useState('');

  let selectedFlaw:
    | {
        name?: string;
        readonly points: number;
      }
    | undefined;

  if (selectedValue) {
    selectedFlaw = optionsMap.get(selectedValue);

    if (selectedFlaw) {
      selectedFlaw = { name: selectedValue, ...selectedFlaw };
    } else {
      // Clear out stale state
      setSelectedValue('');
    }
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleAdd = () => {
    addFlaw(selectedFlaw!.name!, selectedFlaw!.points);
    setSelectedValue('');
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

  const optionsList: JSX.Element[] = [];

  optionsMap.forEach((value, key) => {
    const flaw = {
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
