import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Section from './Section';

const XP = ({ spent, gainedFromFlaws, available, bankable }) => {
  const availableClass = classNames({
    'xp__available-points--negative': available < 0
  });

  return (
    <Section header="XP">
      <div>Spent: {spent}</div>
      <div>Gained from Flaws: {gainedFromFlaws}</div>
      <div>
        Available: <span className={availableClass}>{available}</span>
      </div>
      <div>Bankable: {bankable}</div>
    </Section>
  );
};

XP.propTypes = {
  spent: PropTypes.number.isRequired,
  gainedFromFlaws: PropTypes.number.isRequired,
  available: PropTypes.number.isRequired,
  bankable: PropTypes.number.isRequired
};

export default XP;
