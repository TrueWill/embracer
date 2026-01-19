import React from 'react';
import classNames from 'classnames';
import Section from './Section';
import styles from './XP.module.css';

interface XPProps {
  spent: number;
  gainedFromFlaws: number;
  available: number;
  bankable: number;
}

export default function XP({ spent, gainedFromFlaws, available, bankable }: XPProps) {
  const availableClass = classNames({
    [styles.negative]: available < 0
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
}
