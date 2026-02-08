import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Focus from './Focus';
import { noop } from '../utils/testUtils';

const foci = ['Strength', 'Dexterity', 'Stamina'];

it('should display foci options', () => {
  render(
    <Focus attribute="physical" foci={foci} onChange={noop} />
  );

  const select = screen.getByRole('combobox');

  expect(select).toBeInTheDocument();
  expect(screen.getByText('Strength')).toBeInTheDocument();
  expect(screen.getByText('Dexterity')).toBeInTheDocument();
  expect(screen.getByText('Stamina')).toBeInTheDocument();
});

it('should display no focus selected option', () => {
  render(
    <Focus attribute="physical" foci={foci} onChange={noop} />
  );

  expect(screen.getByText('(no focus selected)')).toBeInTheDocument();
});

it('should select current value', () => {
  render(
    <Focus
      attribute="physical"
      foci={foci}
      value="Dexterity"
      onChange={noop}
    />
  );

  expect(screen.getByRole('combobox')).toHaveValue('Dexterity');
});

it('should default to empty string when no value', () => {
  render(
    <Focus attribute="physical" foci={foci} onChange={noop} />
  );

  expect(screen.getByRole('combobox')).toHaveValue('');
});

it('should call onChange with attribute and focus', async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render(
    <Focus attribute="physical" foci={foci} onChange={onChange} />
  );

  await user.selectOptions(screen.getByRole('combobox'), 'Stamina');

  expect(onChange).toHaveBeenCalledWith('physical', 'Stamina');
});
