import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';

export default function Blood({ bloodPool, bloodPerTurn }) {
  return (
    <Section header="Blood">
      <div>Blood Pool: {bloodPool}</div>
      <div>Blood/Turn: {bloodPerTurn}</div>
    </Section>
  );
}

Blood.propTypes = {
  bloodPool: PropTypes.number.isRequired,
  bloodPerTurn: PropTypes.number.isRequired
};
