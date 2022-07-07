import Section from './Section';

interface ValidationProps {
  validationState: {
    requiredSteps: string[];
  };
}

export default function Validation({
  validationState
}: ValidationProps): JSX.Element {
  const selectedList: JSX.Element[] = validationState.requiredSteps.map(
    (x: string) => <li key={x}>{x}</li>
  );

  return (
    <Section header="Required steps remaining">
      {selectedList.length ? <ul>{selectedList}</ul> : <div>None!</div>}
    </Section>
  );
}
