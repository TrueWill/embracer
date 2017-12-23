import React from 'react';
import PropTypes from 'prop-types';

const descriptions = ['Primary', 'Secondary', 'Tertiary', 'Quaternary'];

const Rank = ({ dots, onChange }) => {
  const optionElements = dots.map((value, index) => (
    <option key={index} value={value}>
      {descriptions[index]} ({value})
    </option>
  ));

  return <select onChange={onChange}>{optionElements}</select>;
};

Rank.propTypes = {
  dots: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired
};

export default Rank;
