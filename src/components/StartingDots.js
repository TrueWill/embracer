import React from 'react';
import PropTypes from 'prop-types';

const StartingDots = ({ available, value, onChange }) => {
  const optionElements = available
    .filter(a => a.count > 0 && a.dots !== value)
    .map(a => (
      <option key={`${a.dots}:${a.count}`} value={a.dots}>
        {a.dots} ({a.count} available)
      </option>
    ));

  return (
    <div>
      Starting dots
      <select value={value} onChange={onChange}>
        <option value={0}>Clear</option>
        {value !== 0 && <option value={value}>{value}</option>}
        {optionElements}
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
