import { ChangeEvent } from 'react';

interface FocusProps {
  attribute: string;
  foci: readonly string[];
  value?: string;
  onChange: (attribute: string, focus: string) => void;
}

export default function Focus({
  attribute,
  foci,
  value,
  onChange
}: FocusProps): JSX.Element {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const focus = e.target.value;
    onChange(attribute, focus);
  };

  const options = foci.map(f => (
    <option key={f} value={f}>
      {f}
    </option>
  ));

  return (
    <select value={value} onChange={handleChange}>
      <option value="">(no focus selected)</option>
      {options}
    </select>
  );
}

Focus.defaultProps = {
  value: ''
};
