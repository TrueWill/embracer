import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import DeleteButton from './DeleteButton';
import { getFlawDescription } from '../utils/meritFlawUtils';
import { maxFlawPoints } from '../constants/flaws';

export default function Flaws({
  optionsMap,
  selected,
  availablePoints,
  addFlaw,
  removeFlaw
}) {
  const [selectedValue, setSelectedValue] = useState('');

  let selectedFlaw;

  if (selectedValue) {
    selectedFlaw = optionsMap.get(selectedValue);

    if (selectedFlaw) {
      selectedFlaw = { name: selectedValue, ...selectedFlaw };
    } else {
      // Clear out stale state
      setSelectedValue('');
    }
  }

  const handleSelectChange = e => {
    setSelectedValue(e.target.value);
  };

  const handleAdd = () => {
    addFlaw(selectedFlaw.name, selectedFlaw.points);
    setSelectedValue('');
  };

  const handleRemove = name => {
    removeFlaw(name);
  };

  const selectedList = selected.map(x => (
    <li key={x.name}>
      {getFlawDescription(x)}{' '}
      <DeleteButton id={x.name} onClick={handleRemove} />
    </li>
  ));

  const optionsList = [];

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

Flaws.propTypes = {
  optionsMap: PropTypes.instanceOf(Map).isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      points: PropTypes.number
    })
  ).isRequired,
  availablePoints: PropTypes.number.isRequired,
  addFlaw: PropTypes.func.isRequired,
  removeFlaw: PropTypes.func.isRequired
};
