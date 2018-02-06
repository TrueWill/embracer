import React from 'react';
import PropTypes from 'prop-types';

const XP = ({ spent, gainedFromFlaws, available }) => (
  <div>
    <h3>XP</h3>
    <div>Spent: {spent}</div>
    <div>Gained from Flaws: {gainedFromFlaws}</div>
    <div>Available: {available}</div>
  </div>
);

XP.propTypes = {
  spent: PropTypes.number.isRequired,
  gainedFromFlaws: PropTypes.number.isRequired,
  available: PropTypes.number.isRequired
};

export default XP;
