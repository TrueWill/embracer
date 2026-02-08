import React from 'react';
import { render, screen } from '@testing-library/react';
import XP from './XP';

it('should display XP values', () => {
  render(
    <XP spent={10} gainedFromFlaws={5} available={25} bankable={5} />
  );

  expect(screen.getByText('Spent: 10')).toBeInTheDocument();
  expect(screen.getByText('Gained from Flaws: 5')).toBeInTheDocument();
  expect(screen.getByText('Bankable: 5')).toBeInTheDocument();
});

it('should display available XP', () => {
  render(
    <XP spent={10} gainedFromFlaws={5} available={25} bankable={5} />
  );

  expect(screen.getByText('25')).toBeInTheDocument();
});

it('should apply negative class when available is negative', () => {
  render(
    <XP spent={40} gainedFromFlaws={0} available={-10} bankable={0} />
  );

  const availableSpan = screen.getByText('-10');

  expect(availableSpan.className).toBeTruthy();
});

it('should not apply negative class when available is positive', () => {
  render(
    <XP spent={10} gainedFromFlaws={0} available={20} bankable={5} />
  );

  const availableSpan = screen.getByText('20');

  expect(availableSpan.className).toBe('');
});
