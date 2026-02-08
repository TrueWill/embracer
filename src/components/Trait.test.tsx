import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Trait from './Trait';
import type { AvailableStartingDot } from '../types';

const defaultAvailable: AvailableStartingDot[] = [
  { dots: 3, count: 1 },
  { dots: 2, count: 1 }
];

const defaultTraitState = {
  startingDots: 0,
  dotsPurchased: 0
};

it('should display the trait name capitalized', () => {
  render(
    <Trait
      name="athletics"
      maxDots={5}
      availableStartingDots={defaultAvailable}
      traitState={defaultTraitState}
      onStartingDotsChange={jest.fn()}
      onClick={jest.fn()}
    />
  );

  expect(screen.getByText('Athletics')).toBeInTheDocument();
});

it('should use displayName override when provided', () => {
  render(
    <Trait
      name="animalKen"
      displayName="Animal Ken"
      maxDots={5}
      availableStartingDots={defaultAvailable}
      traitState={defaultTraitState}
      onStartingDotsChange={jest.fn()}
      onClick={jest.fn()}
    />
  );

  expect(screen.getByText('Animal Ken')).toBeInTheDocument();
});

it('should call onClick with trait name when dots clicked', async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  const { container } = render(
    <Trait
      name="brawl"
      maxDots={5}
      availableStartingDots={defaultAvailable}
      traitState={defaultTraitState}
      onStartingDotsChange={jest.fn()}
      onClick={onClick}
    />
  );

  const dots = container.querySelector('.dots');
  if (dots) {
    await user.click(dots);
  }

  expect(onClick).toHaveBeenCalledWith('brawl');
});

it('should not render StartingDots when no available dots', () => {
  const { container } = render(
    <Trait
      name="brawl"
      maxDots={5}
      availableStartingDots={[]}
      traitState={defaultTraitState}
      onStartingDotsChange={jest.fn()}
      onClick={jest.fn()}
    />
  );

  expect(container.querySelectorAll('select')).toHaveLength(0);
});

it('should render StartingDots when available dots exist', () => {
  const { container } = render(
    <Trait
      name="brawl"
      maxDots={5}
      availableStartingDots={defaultAvailable}
      traitState={defaultTraitState}
      onStartingDotsChange={jest.fn()}
      onClick={jest.fn()}
    />
  );

  expect(container.querySelectorAll('select')).toHaveLength(1);
});

it('should not show clear option for generation trait', () => {
  render(
    <Trait
      name="generation"
      maxDots={5}
      availableStartingDots={defaultAvailable}
      traitState={{ startingDots: 1 }}
      onStartingDotsChange={jest.fn()}
      onClick={jest.fn()}
    />
  );

  expect(screen.queryByText('(clear)')).not.toBeInTheDocument();
});
