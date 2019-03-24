import React from 'react';
import PropTypes from 'prop-types';

export default function Rituals({
  rituals,
  ritualPermutations,
  updateRituals
}) {
  const handleChange = e => {
    updateRituals(JSON.parse(e.target.value));
  };

  const options = ritualPermutations.map(p => {
    const valueAsString = JSON.stringify(p.value);

    return (
      <option value={valueAsString} key={valueAsString}>
        {p.description}
      </option>
    );
  });

  return (
    <div className="row">
      <div className="col-sm-3">Rituals:</div>
      <div className="col-sm-9">
        <select value={JSON.stringify(rituals)} onChange={handleChange}>
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
