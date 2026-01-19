import React from 'react';
import type { AvailableStartingDot } from '../types';
import styles from './StartingDots.module.css';

interface StartingDotsProps {
  available: AvailableStartingDot[];
  value?: number;
  disallowClear?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function StartingDots({
  available,
  value = 0,
  disallowClear = false,
  onChange
}: StartingDotsProps) {
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
}
