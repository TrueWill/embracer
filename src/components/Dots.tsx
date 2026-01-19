import React from 'react';
import styles from './Dots.module.css';

const unfilledClass = 'fa fa-circle-thin';
const filledClass = 'fa fa-circle';

interface DotsProps {
  level?: number;
  max?: number;
  onClick?: () => void;
}

export default function Dots({ level = 0, max = 5, onClick }: DotsProps) {
  const items = Array(max);

  for (let i = 0; i < max; i++) {
    items[i] = i < level ? filledClass : unfilledClass;
  }

  return (
    <div className={styles.dots} onClick={onClick}>
      {items.map((value, index) => (
        <i key={index} className={value} aria-hidden="true" />
      ))}
    </div>
  );
}
