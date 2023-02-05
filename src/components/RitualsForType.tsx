import { ChangeEvent } from 'react';

interface RitualsForTypeProps {
  ritualType: string;
  displayName: string;
  permutations: {
    description: string;
    value: number[];
  }[];
  selected: number[];
  updateRituals: (ritualType: string, rituals: number[]) => void;
}

export default function RitualsForType({
  ritualType,
  displayName,
  permutations,
  selected,
  updateRituals
}: RitualsForTypeProps): JSX.Element {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const rituals = JSON.parse(e.target.value);

    updateRituals(ritualType, rituals);
  };

  const options = permutations.map(p => {
    const valueAsString = JSON.stringify(p.value);

    return (
      <option value={valueAsString} key={valueAsString}>
        {p.description}
      </option>
    );
  });

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="row">
          <div className="col-sm-12">{displayName}</div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <select value={JSON.stringify(selected)} onChange={handleChange}>
              {options}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
