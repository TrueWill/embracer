import React from 'react';
import { humanity } from '../constants/characterOptions';
import Dots from './Dots';
import Section from './Section';

interface MoralityOption {
  points: number;
}

interface MoralityProps {
  optionsMap: Map<string, MoralityOption>;
  path: string;
  level: number;
  maxDots: number;
  purchaseOrUnpurchaseMoralityDot: () => void;
  updateMoralityIfPointsAvailable: (path: string) => void;
}

const getDescription = (option: { name: string; points: number }) =>
  `${option.name} (${option.points} point merit)`;

export default function Morality({
  optionsMap,
  path,
  level,
  maxDots,
  purchaseOrUnpurchaseMoralityDot,
  updateMoralityIfPointsAvailable
}: MoralityProps) {
  const handleOnClick = () => {
    purchaseOrUnpurchaseMoralityDot();
  };

  const handlePathChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPath = e.target.value;

    updateMoralityIfPointsAvailable(newPath);
  };

  const pathOptions: JSX.Element[] = [];

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
