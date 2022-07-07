import { ChangeEvent, useState } from 'react';
import Section from './Section';
import DeleteButton from './DeleteButton';
import { getSelectedMeritDescription } from '../utils/meritFlawUtils';
import { maxMeritPoints } from '../constants/merits';
import { StandardMeritFlaw } from '../types';

const getOptionDescription: (merit: StandardMeritFlaw) => string = merit =>
  `${merit.name}${merit.multiple ? '*' : ''} (${merit.points} point${
    merit.points > 1 ? 's' : ''
  })`;

interface MeritsProps {
  optionsMap: Map<
    string,
    {
      readonly points: number;
      readonly multiple?: boolean;
    }
  >;
  selected: {
    name: string;
    points: number;
    timesPurchased?: number;
  }[];
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
}: MeritsProps): JSX.Element {
  const [selectedValue, setSelectedValue] = useState('');

  let selectedMerit:
    | {
        name?: string;
        readonly points: number;
      }
    | undefined;

  if (selectedValue) {
    selectedMerit = optionsMap.get(selectedValue);

    if (selectedMerit) {
      selectedMerit = { name: selectedValue, ...selectedMerit };
    } else {
      // Clear out stale state
      setSelectedValue('');
    }
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleAdd = () => {
    addMerit(selectedMerit!.name!, selectedMerit!.points);
    setSelectedValue('');
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
    const merit = {
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
