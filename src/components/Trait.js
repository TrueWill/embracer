import React from 'react';
import PropTypes from 'prop-types';
import Dots from './Dots';
import StartingDots from './StartingDots';
import getDots from '../utils/getDots';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import styles from './Trait.module.css';

export default function Trait({
  name,
  displayName = capitalizeFirstLetter(name),
  maxDots,
  availableStartingDots,
  traitState,
  onStartingDotsChange,
  onClick
}) {
  const handleStartingDotsChange = e => {
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

Trait.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  maxDots: PropTypes.number.isRequired,
  availableStartingDots: PropTypes.arrayOf(
    PropTypes.shape({
      dots: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired,
  traitState: PropTypes.object.isRequired,
  onStartingDotsChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
