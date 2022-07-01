import { within } from '@testing-library/react';
// Utilities for use in unit tests.

export const noop = () => {};

/** Values will be strings. */
export const getOptionValues = select =>
  within(select)
    .getAllByRole('option')
    .map(o => o.getAttribute('value'));

export const getOptionItems = select =>
  within(select)
    .getAllByRole('option')
    .map(o => o.text);
