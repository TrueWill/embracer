import { ChangeEventHandler } from 'react';
import styles from './StartingDots.module.css';
import { DotsCount } from '../types';

interface StartingDotsProps {
  available: readonly DotsCount[];
  value?: number;
  disallowClear?: boolean;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export default function StartingDots({
  available,
  value,
  disallowClear,
  onChange
}: StartingDotsProps): JSX.Element {
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

StartingDots.defaultProps = {
  value: 0,
  disallowClear: false
};
