import React from 'react';
import PropTypes from 'prop-types';
import RitualsForType from './RitualsForType';

export default function Rituals({ rituals, updateRituals }) {
  if (rituals.length === 0) {
    return null;
  }

  // TODO: Pass ritualType and convert action creator to take that rather than discipline
  // TODO: Pass displayName and display
  // TODO: Add Bootstrap styling

  const ritualsForTypes = rituals.map(r => (
    <RitualsForType
      key={r.ritualType}
      permutations={r.permutations}
      selected={r.selected}
      updateRituals={updateRituals}
    />
  ));

  return (
    <div>
      <h1>RITUALS</h1>
      {ritualsForTypes}
    </div>
  );
}

Rituals.propTypes = {
  rituals: PropTypes.arrayOf(
    PropTypes.shape({
      ritualType: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      permutations: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string.isRequired,
          value: PropTypes.arrayOf(PropTypes.number).isRequired
        })
      ).isRequired,
      selected: PropTypes.arrayOf(PropTypes.number).isRequired
    })
  ).isRequired,
  updateRituals: PropTypes.func.isRequired
};
