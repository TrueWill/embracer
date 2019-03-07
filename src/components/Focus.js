import React from 'react';
import PropTypes from 'prop-types';

export default function Focus({ attribute, foci, value, onChange }) {
  const handleChange = e => {
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

Focus.propTypes = {
  attribute: PropTypes.string.isRequired,
  foci: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
