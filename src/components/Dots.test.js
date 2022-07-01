import React from 'react';
import { render } from '@testing-library/react';
import Dots from './Dots';

const unfilledSelector = '.fa-circle-thin';
const filledSelector = '.fa-circle';

it('should use defaults', () => {
  const { container } = render(<Dots />);

  expect(container.querySelectorAll(unfilledSelector)).toHaveLength(5);
  expect(container.querySelectorAll(filledSelector)).toHaveLength(0);
});

it('should work when max level', () => {
  const { container } = render(<Dots level={4} max={4} />);

  expect(container.querySelectorAll(unfilledSelector)).toHaveLength(0);
  expect(container.querySelectorAll(filledSelector)).toHaveLength(4);
});

it('should work when partial level', () => {
  const { container } = render(<Dots level={2} max={5} />);

  expect(container.querySelectorAll(unfilledSelector)).toHaveLength(3);
  expect(container.querySelectorAll(filledSelector)).toHaveLength(2);
});
