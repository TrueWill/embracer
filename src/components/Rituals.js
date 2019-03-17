import React from 'react';
import PropTypes from 'prop-types';

export default function Rituals({ rituals, maxLevel, maxRituals }) {
  return (
    <div>
      <div>
        <select value={0}>
          <option value={0}>(none)</option>
          <option value={1}>1 Level One</option>
          <option value={2}>2 Level Ones</option>
          <option value={2}>1 Level One, 1 Level Two</option>
          <option value={2}>2 Level Ones, 1 Level Two</option>
        </select>
      </div>
    </div>
  );
}

Rituals.propTypes = {
  rituals: PropTypes.arrayOf(PropTypes.number).isRequired,
  maxLevel: PropTypes.number.isRequired,
  maxRituals: PropTypes.number.isRequired
};
