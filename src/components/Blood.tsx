import React from 'react';
import Section from './Section';

interface BloodProps {
  bloodPool: number;
  bloodPerTurn: number;
}

export default function Blood({ bloodPool, bloodPerTurn }: BloodProps) {
  return (
    <Section header="Blood">
      <div>Blood Pool: {bloodPool}</div>
      <div>Blood/Turn: {bloodPerTurn}</div>
    </Section>
  );
}
