import React from 'react';
import PropTypes from 'prop-types';

export default function RitualsForType({
  permutations,
  selected,
  updateRituals
}) {
  const handleChange = e => {
    updateRituals('Thaumaturgy: ', JSON.parse(e.target.value)); // TODO: debug
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
      <div className="col-sm-3">Rituals:</div>
      <div className="col-sm-9">
        <select value={JSON.stringify(selected)} onChange={handleChange}>
          {options}
        </select>
      </div>
    </div>
  );
}

RitualsForType.propTypes = {
  permutations: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      value: PropTypes.arrayOf(PropTypes.number).isRequired
    })
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateRituals: PropTypes.func.isRequired
};
