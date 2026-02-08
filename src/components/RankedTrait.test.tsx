import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RankedTrait from './RankedTrait';

const defaultTraitState = {
  dotsFromRank: 7,
  dotsPurchased: 0
};

const rankDots = [7, 5, 3];

it('should display trait name capitalized', () => {
  render(
    <RankedTrait
      name="physical"
      maxDots={10}
      rankDots={rankDots}
      traitState={defaultTraitState}
      onRankChange={vi.fn()}
      onClick={vi.fn()}
    />
  );

  expect(screen.getByText('Physical')).toBeInTheDocument();
});

it('should use displayName override when provided', () => {
  render(
    <RankedTrait
      name="physical"
      displayName="Custom Name"
      maxDots={10}
      rankDots={rankDots}
      traitState={defaultTraitState}
      onRankChange={vi.fn()}
      onClick={vi.fn()}
    />
  );

  expect(screen.getByText('Custom Name')).toBeInTheDocument();
});

it('should display rank options', () => {
  render(
    <RankedTrait
      name="physical"
      maxDots={10}
      rankDots={rankDots}
      traitState={defaultTraitState}
      onRankChange={vi.fn()}
      onClick={vi.fn()}
    />
  );

  expect(screen.getByText('Primary (7)')).toBeInTheDocument();
  expect(screen.getByText('Secondary (5)')).toBeInTheDocument();
  expect(screen.getByText('Tertiary (3)')).toBeInTheDocument();
});

it('should call onRankChange with name and dots when rank changes', async () => {
  const user = userEvent.setup();
  const onRankChange = vi.fn();

  render(
    <RankedTrait
      name="social"
      maxDots={10}
      rankDots={rankDots}
      traitState={{ dotsFromRank: 0, dotsPurchased: 0 }}
      onRankChange={onRankChange}
      onClick={vi.fn()}
    />
  );

  await user.selectOptions(screen.getByRole('combobox'), '5');

  expect(onRankChange).toHaveBeenCalledWith('social', 5);
});

it('should call onClick with name when dots clicked', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();

  const { container } = render(
    <RankedTrait
      name="mental"
      maxDots={10}
      rankDots={rankDots}
      traitState={defaultTraitState}
      onRankChange={vi.fn()}
      onClick={onClick}
    />
  );

  const dots = container.querySelector('.dots');
  if (dots) {
    await user.click(dots);
  }

  expect(onClick).toHaveBeenCalledWith('mental');
});
