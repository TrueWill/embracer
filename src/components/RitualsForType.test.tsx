import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RitualsForType from './RitualsForType';

const permutations = [
  { description: 'None', value: [] },
  { description: '1 Basic', value: [1] },
  { description: '2 Basic', value: [1, 1] }
];

it('should display the display name', () => {
  render(
    <RitualsForType
      ritualType="necromantic"
      displayName="Necromantic Rituals"
      permutations={permutations}
      selected={[]}
      updateRituals={vi.fn()}
    />
  );

  expect(screen.getByText('Necromantic Rituals')).toBeInTheDocument();
});

it('should display permutation options', () => {
  render(
    <RitualsForType
      ritualType="necromantic"
      displayName="Necromantic Rituals"
      permutations={permutations}
      selected={[]}
      updateRituals={vi.fn()}
    />
  );

  expect(screen.getByText('None')).toBeInTheDocument();
  expect(screen.getByText('1 Basic')).toBeInTheDocument();
  expect(screen.getByText('2 Basic')).toBeInTheDocument();
});

it('should call updateRituals with parsed value on change', async () => {
  const user = userEvent.setup();
  const updateRituals = vi.fn();

  render(
    <RitualsForType
      ritualType="necromantic"
      displayName="Necromantic Rituals"
      permutations={permutations}
      selected={[]}
      updateRituals={updateRituals}
    />
  );

  await user.selectOptions(screen.getByRole('combobox'), JSON.stringify([1]));

  expect(updateRituals).toHaveBeenCalledWith('necromantic', [1]);
});
