import { ChangeEventHandler } from 'react';

const descriptions = [
  'Primary',
  'Secondary',
  'Tertiary',
  'Quaternary',
  'Quinary',
  'Senary',
  'Septenary',
  'Octonary',
  'Nonary',
  'Denary'
] as const;

interface RankProps {
  dots: readonly number[];
  dotValue?: number;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export default function Rank({
  dots,
  dotValue,
  onChange
}: RankProps): JSX.Element {
  const optionElements = dots.map((value, index) => (
    <option key={index} value={value}>
      {descriptions[index]} ({value})
    </option>
  ));

  return (
    <select value={dotValue} onChange={onChange}>
      <option value={0}>(not ranked)</option>
      {optionElements}
    </select>
  );
}

Rank.defaultProps = {
  dotValue: 0
};
