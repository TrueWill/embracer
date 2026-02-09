import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Rank from './Rank';

const dots = [7, 5, 3];

it('should display not ranked option', () => {
  render(<Rank dots={dots} onChange={vi.fn()} />);

  expect(screen.getByText('(not ranked)')).toBeInTheDocument();
});

it('should display rank options with descriptions', () => {
  render(<Rank dots={dots} onChange={vi.fn()} />);

  expect(screen.getByText('Primary (7)')).toBeInTheDocument();
  expect(screen.getByText('Secondary (5)')).toBeInTheDocument();
  expect(screen.getByText('Tertiary (3)')).toBeInTheDocument();
});

it('should default to not ranked when no dotValue', () => {
  render(<Rank dots={dots} onChange={vi.fn()} />);

  expect(screen.getByRole('combobox')).toHaveValue('0');
});

it('should select current dotValue', () => {
  render(<Rank dots={dots} dotValue={5} onChange={vi.fn()} />);

  expect(screen.getByRole('combobox')).toHaveValue('5');
});

it('should call onChange when selection changes', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();

  render(<Rank dots={dots} onChange={onChange} />);

  await user.selectOptions(screen.getByRole('combobox'), '7');

  expect(onChange).toHaveBeenCalledTimes(1);
});
