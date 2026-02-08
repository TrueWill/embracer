import React from 'react';
import { render, screen } from '@testing-library/react';
import Validation from './Validation';

it('should display required steps', () => {
  const validationState = {
    requiredSteps: ['Select a clan', 'Rank attributes']
  };

  render(<Validation validationState={validationState} />);

  expect(screen.getByText('Select a clan')).toBeInTheDocument();
  expect(screen.getByText('Rank attributes')).toBeInTheDocument();
});

it('should display None when no required steps remain', () => {
  const validationState = {
    requiredSteps: []
  };

  render(<Validation validationState={validationState} />);

  expect(screen.getByText('None!')).toBeInTheDocument();
});

it('should render steps as list items', () => {
  const validationState = {
    requiredSteps: ['Step 1', 'Step 2', 'Step 3']
  };

  const { container } = render(
    <Validation validationState={validationState} />
  );

  expect(container.querySelectorAll('li')).toHaveLength(3);
});

it('should display section header', () => {
  render(
    <Validation validationState={{ requiredSteps: [] }} />
  );

  expect(screen.getByText('Required steps remaining')).toBeInTheDocument();
});
