import { ChangeEvent } from 'react';
import { humanity } from '../constants/characterOptions';
import Dots from './Dots';
import Section from './Section';

const getDescription: (option: {
  name: string;
  points: number;
}) => string = option => `${option.name} (${option.points} point merit)`;

interface MoralityProps {
  optionsMap: Map<
    string,
    {
      points: number;
    }
  >;
  path: string;
  level: number;
  maxDots: number;
  purchaseOrUnpurchaseMoralityDot: () => void;
  updateMoralityIfPointsAvailable: (newPath: string) => void;
}

export default function Morality({
  optionsMap,
  path,
  level,
  maxDots,
  purchaseOrUnpurchaseMoralityDot,
  updateMoralityIfPointsAvailable
}: MoralityProps): JSX.Element {
  const handleOnClick = () => {
    purchaseOrUnpurchaseMoralityDot();
  };

  const handlePathChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
