import React from 'react';
import PropTypes from 'prop-types';
import RitualsForType from './RitualsForType';
import Section from './Section';

export default function Rituals({ rituals, updateRituals }) {
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
