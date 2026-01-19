import React from 'react';
import RitualsForType from './RitualsForType';
import Section from './Section';

interface RitualPermutation {
  description: string;
  value: number[];
}

interface RitualData {
  ritualType: string;
  displayName: string;
  permutations: RitualPermutation[];
  selected: number[];
}

interface RitualsProps {
  rituals: RitualData[];
  updateRituals: (ritualType: string, rituals: number[]) => void;
}

export default function Rituals({ rituals, updateRituals }: RitualsProps) {
  if (rituals.length === 0) {
    return null;
  }

  const ritualsForTypes = rituals.map(r => (
    <RitualsForType
      key={r.ritualType}
      ritualType={r.ritualType}
      displayName={r.displayName}
      permutations={r.permutations}
      selected={r.selected}
      updateRituals={updateRituals}
    />
  ));

  return <Section header="Rituals">{ritualsForTypes}</Section>;
}
