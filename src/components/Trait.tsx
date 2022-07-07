import Dots from './Dots';
import StartingDots from './StartingDots';
import getDots from '../utils/getDots';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import styles from './Trait.module.css';
import { DotsCount, TraitState } from '../types';
import { ChangeEvent } from 'react';

interface TraitProps {
  name: string;
  displayName?: string;
  maxDots: number;
  availableStartingDots: readonly DotsCount[];
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
}: TraitProps): JSX.Element {
  const handleStartingDotsChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
