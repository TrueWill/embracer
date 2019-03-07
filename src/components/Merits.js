import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import DeleteButton from './DeleteButton';
import { getSelectedMeritDescription } from '../utils/meritFlawUtils';
import { maxMeritPoints } from '../constants/merits';

const getOptionDescription = merit =>
  `${merit.name}${merit.multiple ? '*' : ''} (${merit.points} point${
    merit.points > 1 ? 's' : ''
  })`;

export default function Merits({
  optionsMap,
  selected,
  availablePoints,
  addMerit,
  removeMerit
}) {
  const [selectedValue, setSelectedValue] = useState('');

  let selectedMerit;

  if (selectedValue) {
    selectedMerit = optionsMap.get(selectedValue);

    if (selectedMerit) {
      selectedMerit = { name: selectedValue, ...selectedMerit };
    } else {
      // Clear out stale state
      setSelectedValue('');
    }
  }

  const handleSelectChange = e => {
    setSelectedValue(e.target.value);
  };

  const handleAdd = () => {
    addMerit(selectedMerit.name, selectedMerit.points);
    setSelectedValue('');
  };

  const handleRemove = name => {
    removeMerit(name);
  };

  const selectedList = selected.map(x => (
    <li key={x.name}>
      {getSelectedMeritDescription(x)}{' '}
      <DeleteButton id={x.name} onClick={handleRemove} />
    </li>
  ));

  const optionsList = [];

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
      <select value={selectedValue} onChange={handleSelectChange}>
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

Merits.propTypes = {
  optionsMap: PropTypes.instanceOf(Map).isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
      timesPurchased: PropTypes.number
    })
  ).isRequired,
  availablePoints: PropTypes.number.isRequired,
  addMerit: PropTypes.func.isRequired,
  removeMerit: PropTypes.func.isRequired
};
