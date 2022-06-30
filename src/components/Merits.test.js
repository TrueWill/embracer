import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { noop, getOptionItems2 } from '../utils/testUtils';
import Merits from './Merits';

const getMeritsSelect = () => screen.getByTestId('merits');

it('should clear state when previously selected value not in new options', async () => {
  const optionsMap = new Map([['Zealot', { points: 1 }]]);

  const { rerender } = render(
    <Merits
      optionsMap={optionsMap}
      selected={[]}
      availablePoints={7}
      addMerit={noop}
      removeMerit={noop}
    />
  );

  await userEvent.selectOptions(getMeritsSelect(), 'Zealot');

  rerender(
    <Merits
      optionsMap={new Map()}
      selected={[]}
      availablePoints={7}
      addMerit={noop}
      removeMerit={noop}
    />
  );

  expect(getMeritsSelect()).toHaveValue('');
});

it('should not clear state when previously selected value in new options', async () => {
  const optionsMap = new Map([
    ['Zealot', { points: 1 }],
    ['Arcane', { points: 1 }]
  ]);

  const { rerender } = render(
    <Merits
      optionsMap={optionsMap}
      selected={[]}
      availablePoints={7}
      addMerit={noop}
      removeMerit={noop}
    />
  );

  await userEvent.selectOptions(getMeritsSelect(), 'Arcane');

  rerender(
    <Merits
      optionsMap={new Map([['Arcane', { points: 1 }]])}
      selected={[]}
      availablePoints={7}
      addMerit={noop}
      removeMerit={noop}
    />
  );

  expect(getMeritsSelect()).toHaveValue('Arcane');
});

it('should calculate descriptions', () => {
  const optionsMap = new Map([
    ['Arcane', { points: 1 }],
    ['Skill Aptitude', { points: 2, multiple: true }]
  ]);

  render(
    <Merits
      optionsMap={optionsMap}
      selected={[]}
      availablePoints={7}
      addMerit={noop}
      removeMerit={noop}
    />
  );

  expect(getOptionItems2(getMeritsSelect())).toEqual([
    '(not selected)',
    'Arcane (1 point)',
    'Skill Aptitude* (2 points)'
  ]);
});

it('should display selected when merit purchased multiple times', () => {
  const optionsMap = new Map([
    ['Skill Aptitude', { points: 2, multiple: true }]
  ]);

  const selected = [
    {
      name: 'Arcane',
      points: 1
    },
    {
      name: 'Skill Aptitude',
      points: 2,
      timesPurchased: 3
    }
  ];

  render(
    <Merits
      optionsMap={optionsMap}
      selected={selected}
      availablePoints={7}
      addMerit={noop}
      removeMerit={noop}
    />
  );

  const items = screen.getAllByRole('listitem').map(i => i.textContent.trim());

  expect(items).toEqual(['Arcane (1 point)', 'Skill Aptitude (2 points X 3)']);
});
