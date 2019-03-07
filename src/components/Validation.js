import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';

export default function Validation({ validationState }) {
  const selectedList = validationState.requiredSteps.map(x => (
    <li key={x}>{x}</li>
  ));

  return (
    <Section header="Required steps remaining">
      {selectedList.length ? <ul>{selectedList}</ul> : <div>None!</div>}
    </Section>
  );
}

Validation.propTypes = {
  validationState: PropTypes.object.isRequired
};
