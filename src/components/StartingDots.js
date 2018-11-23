import React from 'react';
import PropTypes from 'prop-types';
import styles from './StartingDots.module.css';

const StartingDots = ({ available, value, disallowClear, onChange }) => {
  const optionElements = available
    .filter(a => a.count > 0 && a.dots !== value)
    .map(a => (
      <option key={`${a.dots}:${a.count}`} value={a.dots}>
        {a.dots} ({a.count} available)
      </option>
    ));

  return (
    <div>
      <span className={styles.label}>Starting dots</span>
      <select value={value} onChange={onChange}>
        {!disallowClear && <option value={0}>Clear</option>}
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
  disallowClear: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

StartingDots.defaultProps = {
  value: 0,
  disallowClear: false
};

export default StartingDots;
