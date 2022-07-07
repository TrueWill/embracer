import RitualsForType from './RitualsForType';
import Section from './Section';

interface RitualsProps {
  rituals: {
    ritualType: string;
    displayName: string;
    permutations: {
      description: string;
      value: number[];
    }[];

    selected: number[];
  }[];
  updateRituals: (ritualType: string, rituals: number[]) => void;
}

export default function Rituals({
  rituals,
  updateRituals
}: RitualsProps): JSX.Element | null {
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
