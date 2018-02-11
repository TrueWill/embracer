import React from 'react';
import PropTypes from 'prop-types';

const Blood = ({ bloodPool, bloodPerTurn }) => (
  <div>
    <h3>Blood</h3>
    <div>Blood Pool: {bloodPool}</div>
    <div>Blood/Turn: {bloodPerTurn}</div>
  </div>
);

Blood.propTypes = {
  bloodPool: PropTypes.number.isRequired,
  bloodPerTurn: PropTypes.number.isRequired
};

export default Blood;
