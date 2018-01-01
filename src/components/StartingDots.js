import React from 'react';
import PropTypes from 'prop-types';

// TODO: Working
const StartingDots = ({ available, value, onChange }) => {
  return (
    <div>
      Starting dots
      <select value={value} onChange={onChange}>
        <option value={1}>1</option>
        <option value={0}>Clear</option>
      </select>
    </div>
  );
};

StartingDots.propTypes = {
  available: PropTypes.arrayOf(
    PropTypes.shape({
      dots: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

StartingDots.defaultProps = {
  value: 0
};

export default StartingDots;
