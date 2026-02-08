import React from 'react';
import { render, screen } from '@testing-library/react';
import Blood from './Blood';

it('should display blood pool', () => {
  render(<Blood bloodPool={10} bloodPerTurn={1} />);

  expect(screen.getByText('Blood Pool: 10')).toBeInTheDocument();
});

it('should display blood per turn', () => {
  render(<Blood bloodPool={10} bloodPerTurn={1} />);

  expect(screen.getByText('Blood/Turn: 1')).toBeInTheDocument();
});

it('should display higher generation values', () => {
  render(<Blood bloodPool={30} bloodPerTurn={5} />);

  expect(screen.getByText('Blood Pool: 30')).toBeInTheDocument();
  expect(screen.getByText('Blood/Turn: 5')).toBeInTheDocument();
});
