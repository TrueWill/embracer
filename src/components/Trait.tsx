import React from 'react';
import type { AvailableStartingDot, TraitState } from '../types';
import Dots from './Dots';
import StartingDots from './StartingDots';
import getDots from '../utils/getDots';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import styles from './Trait.module.css';

interface TraitProps {
  name: string;
  displayName?: string;
  maxDots: number;
  availableStartingDots: AvailableStartingDot[];
  traitState: TraitState;
  onStartingDotsChange: (name: string, startingDots: number) => void;
  onClick: (name: string) => void;
}

export default function Trait({
  name,
  displayName = capitalizeFirstLetter(name),
  maxDots,
  availableStartingDots,
  traitState,
  onStartingDotsChange,
  onClick
}: TraitProps) {
  const handleStartingDotsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const startingDots = parseInt(e.target.value, 10);
    onStartingDotsChange(name, startingDots);
  };

  const handleOnClick = () => {
    onClick(name);
  };

  return (
    <div>
      <div className={styles.name}>{displayName}</div>
      <Dots level={getDots(traitState)} max={maxDots} onClick={handleOnClick} />
      {availableStartingDots.length > 0 && (
        <StartingDots
          available={availableStartingDots}
          value={traitState.startingDots}
          disallowClear={name === 'generation'}
          onChange={handleStartingDotsChange}
        />
      )}
    </div>
  );
}
