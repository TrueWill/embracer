import React from 'react';
import PropTypes from 'prop-types';

export default function RitualsForType({
  ritualType,
  displayName,
  permutations,
  selected,
  updateRituals
}) {
  const handleChange = e => {
    const rituals = JSON.parse(e.target.value);

    updateRituals(ritualType, rituals);
  };

  const options = permutations.map(p => {
    const valueAsString = JSON.stringify(p.value);

    return (
      <option value={valueAsString} key={valueAsString}>
        {p.description}
      </option>
    );
  });

  return (
    <div className="row">
      <div className="col-sm-3">{displayName} Rituals:</div>
      <div className="col-sm-9">
        <select value={JSON.stringify(selected)} onChange={handleChange}>
          {options}
        </select>
      </div>
    </div>
  );
}

RitualsForType.propTypes = {
  ritualType: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  permutations: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      value: PropTypes.arrayOf(PropTypes.number).isRequired
    })
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateRituals: PropTypes.func.isRequired
};
