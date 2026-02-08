import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { humanity } from '../constants/characterOptions';
import Morality from './Morality';

const defaultOptionsMap = new Map([
  ['Path of Blood', { points: 3 }],
  ['Path of Bones', { points: 3 }]
]);

it('should display Humanity option', () => {
  render(
    <Morality
      optionsMap={defaultOptionsMap}
      path={humanity}
      level={5}
      maxDots={6}
      purchaseOrUnpurchaseMoralityDot={jest.fn()}
      updateMoralityIfPointsAvailable={jest.fn()}
    />
  );

  expect(screen.getByText(humanity)).toBeInTheDocument();
});

it('should display path options with point costs', () => {
  render(
    <Morality
      optionsMap={defaultOptionsMap}
      path={humanity}
      level={5}
      maxDots={6}
      purchaseOrUnpurchaseMoralityDot={jest.fn()}
      updateMoralityIfPointsAvailable={jest.fn()}
    />
  );

  expect(
    screen.getByText('Path of Blood (3 point merit)')
  ).toBeInTheDocument();
  expect(
    screen.getByText('Path of Bones (3 point merit)')
  ).toBeInTheDocument();
});

it('should select current path', () => {
  render(
    <Morality
      optionsMap={defaultOptionsMap}
      path={humanity}
      level={5}
      maxDots={6}
      purchaseOrUnpurchaseMoralityDot={jest.fn()}
      updateMoralityIfPointsAvailable={jest.fn()}
    />
  );

  expect(screen.getByRole('combobox')).toHaveValue(humanity);
});

it('should call updateMoralityIfPointsAvailable on path change', async () => {
  const user = userEvent.setup();
  const updateMorality = jest.fn();

  render(
    <Morality
      optionsMap={defaultOptionsMap}
      path={humanity}
      level={5}
      maxDots={6}
      purchaseOrUnpurchaseMoralityDot={jest.fn()}
      updateMoralityIfPointsAvailable={updateMorality}
    />
  );

  await user.selectOptions(screen.getByRole('combobox'), 'Path of Blood');

  expect(updateMorality).toHaveBeenCalledWith('Path of Blood');
});

it('should call purchaseOrUnpurchaseMoralityDot on dots click', async () => {
  const user = userEvent.setup();
  const purchaseDot = jest.fn();

  const { container } = render(
    <Morality
      optionsMap={defaultOptionsMap}
      path={humanity}
      level={5}
      maxDots={6}
      purchaseOrUnpurchaseMoralityDot={purchaseDot}
      updateMoralityIfPointsAvailable={jest.fn()}
    />
  );

  const dots = container.querySelector('.dots');
  if (dots) {
    await user.click(dots);
  }

  expect(purchaseDot).toHaveBeenCalledTimes(1);
});
