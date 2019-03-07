import React from 'react';
import PropTypes from 'prop-types';
import { humanity } from '../constants/characterOptions';
import Dots from './Dots';
import Section from './Section';

const getDescription = option =>
  `${option.name} (${option.points} point merit)`;

export default function Morality({
  optionsMap,
  path,
  level,
  maxDots,
  purchaseOrUnpurchaseMoralityDot,
  updateMoralityIfPointsAvailable
}) {
  const handleOnClick = () => {
    purchaseOrUnpurchaseMoralityDot();
  };

  const handlePathChange = e => {
    const newPath = e.target.value;

    updateMoralityIfPointsAvailable(newPath);
  };

  const pathOptions = [];

  optionsMap.forEach((value, key) => {
    const moralityMerit = {
      name: key,
      points: value.points
    };

    pathOptions.push(
      <option value={moralityMerit.name} key={moralityMerit.name}>
        {getDescription(moralityMerit)}
      </option>
    );
  });

  return (
    <Section header="Morality">
      <select value={path} onChange={handlePathChange}>
        <option value={humanity}>{humanity}</option>
        {pathOptions}
      </select>
      <Dots level={level} max={maxDots} onClick={handleOnClick} />
    </Section>
  );
}

Morality.propTypes = {
  optionsMap: PropTypes.instanceOf(Map).isRequired,
  path: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  maxDots: PropTypes.number.isRequired,
  purchaseOrUnpurchaseMoralityDot: PropTypes.func.isRequired,
  updateMoralityIfPointsAvailable: PropTypes.func.isRequired
};
