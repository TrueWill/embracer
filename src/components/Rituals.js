import React from 'react';
import PropTypes from 'prop-types';

export default function Rituals({
  rituals,
  ritualPermutations,
  updateRituals
}) {
  const handleChange = e => {
    // TODO: Move to utils, add tests
    const stringToArray = s =>
      s
        .split(',')
        .filter(x => x)
        .map(x => parseInt(x, 10));

    updateRituals(stringToArray(e.target.value));
  };

  const options = ritualPermutations.map(p => (
    <option value={p.value.toString()} key={p.value.toString()}>
      {p.description}
    </option>
  ));

  return (
    <div className="row">
      <div className="col-sm-3">Rituals:</div>
      <div className="col-sm-9">
        <select value={rituals.toString()} onChange={handleChange}>
          {options}
        </select>
      </div>
    </div>
  );
}

Rituals.propTypes = {
  rituals: PropTypes.arrayOf(PropTypes.number).isRequired,
  ritualPermutations: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      value: PropTypes.arrayOf(PropTypes.number).isRequired
    })
  ).isRequired,
  updateRituals: PropTypes.func.isRequired
};
