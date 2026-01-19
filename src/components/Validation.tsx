import React from 'react';
import Section from './Section';

interface ValidationState {
  requiredSteps: string[];
}

interface ValidationProps {
  validationState: ValidationState;
}

export default function Validation({ validationState }: ValidationProps) {
  const selectedList = validationState.requiredSteps.map(x => (
    <li key={x}>{x}</li>
  ));

  return (
    <Section header="Required steps remaining">
      {selectedList.length ? <ul>{selectedList}</ul> : <div>None!</div>}
    </Section>
  );
}
