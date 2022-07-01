import React from 'react';
import { render, screen } from '@testing-library/react';
import { noop, getOptionValues2 } from '../utils/testUtils';
import StartingDots from './StartingDots';

const getDotsSelect = () => screen.getByRole('combobox');

it('should display current value and clear when none available', () => {
  render(<StartingDots available={[]} value={1} onChange={noop} />);

  const dotsSelect = getDotsSelect();

  // See https://github.com/testing-library/jest-dom/issues/364
  expect(dotsSelect).toHaveValue('1');
  expect(getOptionValues2(dotsSelect)).toEqual(['0', '1']);
});

it('should display only clear when no current value and none available', () => {
  render(<StartingDots available={[]} onChange={noop} />);

  const dotsSelect = getDotsSelect();

  expect(dotsSelect).toHaveValue('0');
  expect(getOptionValues2(dotsSelect)).toEqual(['0']);
});

it('should display only clear and other values when no current value', () => {
  render(
    <StartingDots
      available={[
        { dots: 4, count: 1 },
        { dots: 3, count: 2 }
      ]}
      onChange={noop}
    />
  );

  const dotsSelect = getDotsSelect();

  expect(dotsSelect).toHaveValue('0');
  expect(getOptionValues2(dotsSelect)).toEqual(['0', '4', '3']);
});

it('should display current value, other values, and clear', () => {
  render(
    <StartingDots
      available={[
        { dots: 4, count: 1 },
        { dots: 3, count: 2 },
        { dots: 1, count: 4 }
      ]}
      value={2}
      onChange={noop}
    />
  );

  const dotsSelect = getDotsSelect();

  expect(dotsSelect).toHaveValue('2');
  expect(getOptionValues2(dotsSelect)).toEqual(['0', '2', '4', '3', '1']);
});

it('should exclude available matching current value', () => {
  render(
    <StartingDots
      available={[
        { dots: 4, count: 1 },
        { dots: 3, count: 2 },
        { dots: 2, count: 2 },
        { dots: 1, count: 4 }
      ]}
      value={2}
      onChange={noop}
    />
  );

  const dotsSelect = getDotsSelect();

  expect(dotsSelect).toHaveValue('2');
  expect(getOptionValues2(dotsSelect)).toEqual(['0', '2', '4', '3', '1']);
});

it('should exclude values with 0 counts unless current', () => {
  render(
    <StartingDots
      available={[
        { dots: 4, count: 1 },
        { dots: 3, count: 0 },
        { dots: 2, count: 0 },
        { dots: 1, count: 4 }
      ]}
      value={2}
      onChange={noop}
    />
  );

  const dotsSelect = getDotsSelect();

  expect(dotsSelect).toHaveValue('2');
  expect(getOptionValues2(dotsSelect)).toEqual(['0', '2', '4', '1']);
});

it('should not include clear as an option if disallow clear', () => {
  render(
    <StartingDots
      available={[
        { dots: 4, count: 1 },
        { dots: 3, count: 2 },
        { dots: 1, count: 4 }
      ]}
      value={2}
      disallowClear={true}
      onChange={noop}
    />
  );

  const dotsSelect = getDotsSelect();

  expect(dotsSelect).toHaveValue('2');
  expect(getOptionValues2(dotsSelect)).toEqual(['2', '4', '3', '1']);
});
