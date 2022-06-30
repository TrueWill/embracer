import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { noop } from '../utils/testUtils';
import Flaws from './Flaws';

const getFlawsSelect = () => screen.getByTestId('flaws');

it('should clear state when previously selected value not in new options', async () => {
  const optionsMap = new Map([['Mistrusted', { points: 1 }]]);

  const { rerender } = render(
    <Flaws
      optionsMap={optionsMap}
      selected={[]}
      availablePoints={7}
      addFlaw={noop}
      removeFlaw={noop}
    />
  );

  await userEvent.selectOptions(getFlawsSelect(), 'Mistrusted');

  rerender(
    <Flaws
      optionsMap={new Map()}
      selected={[]}
      availablePoints={7}
      addFlaw={noop}
      removeFlaw={noop}
    />
  );

  expect(getFlawsSelect()).toHaveValue('');
});

it('should not clear state when previously selected value in new options', async () => {
  const optionsMap = new Map([
    ['Mistrusted', { points: 1 }],
    ['Amnesia', { points: 1 }]
  ]);

  const { rerender } = render(
    <Flaws
      optionsMap={optionsMap}
      selected={[]}
      availablePoints={7}
      addFlaw={noop}
      removeFlaw={noop}
    />
  );

  await userEvent.selectOptions(getFlawsSelect(), 'Amnesia');

  rerender(
    <Flaws
      optionsMap={new Map([['Amnesia', { points: 1 }]])}
      selected={[]}
      availablePoints={7}
      addFlaw={noop}
      removeFlaw={noop}
    />
  );

  expect(getFlawsSelect()).toHaveValue('Amnesia');
});
