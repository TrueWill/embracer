import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const XP = ({ spent, gainedFromFlaws, available, bankable }) => {
  const availableClass = classNames({ negativePoints: available < 0 });

  return (
    <div>
      <h3>XP</h3>
      <div>Spent: {spent}</div>
      <div>Gained from Flaws: {gainedFromFlaws}</div>
      <div>
        Available: <span className={availableClass}>{available}</span>
      </div>
      <div>Bankable: {bankable}</div>
    </div>
  );
};

XP.propTypes = {
  spent: PropTypes.number.isRequired,
  gainedFromFlaws: PropTypes.number.isRequired,
  available: PropTypes.number.isRequired,
  bankable: PropTypes.number.isRequired
};

export default XP;
