import React from 'react';
import PropTypes from 'prop-types';

const Rank = ({ options, onChange }) => {
  const optionElements = options.map(o => (
    <option key={o.dots} value={o.dots}>
      {o.description}
    </option>
  ));

  return <select onChange={onChange}>{optionElements}</select>;
};

Rank.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      dots: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
};

export default Rank;
