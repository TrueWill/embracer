import React from 'react';

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
];

interface RankProps {
  dots: number[];
  dotValue?: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Rank({ dots, dotValue = 0, onChange }: RankProps) {
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
