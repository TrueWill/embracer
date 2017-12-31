import React from 'react';
import PropTypes from 'prop-types';

const descriptions = [
  'Primary',
  'Secondary',
  'Tertiary',
  'Quaternary',
  'Quinary',
  'Senary',
  'Septenary',
  'Octonary',
  'Nonary',
  'Denary'
];

const Rank = ({ dots, dotValue, onChange }) => {
  const optionElements = dots.map((value, index) => (
    <option key={index} value={value}>
      {descriptions[index]} ({value})
    </option>
  ));

  return (
    <select value={dotValue} onChange={onChange}>
      <option value={0}>(not ranked)</option>
      {optionElements}
    </select>
  );
};

Rank.propTypes = {
  dots: PropTypes.arrayOf(PropTypes.number).isRequired,
  dotValue: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

Rank.defaultProps = {
  dotValue: 0
};

export default Rank;
