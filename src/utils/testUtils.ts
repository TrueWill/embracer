import { within } from '@testing-library/react';
// Utilities for use in unit tests.

export const noop = (): void => {};

export const getOptionValues = (select: HTMLElement): string[] =>
  within(select)
    .getAllByRole('option')
    .map(o => o.getAttribute('value') as string);

export const getOptionItems = (select: HTMLElement): string[] =>
  within(select)
    .getAllByRole('option')
    .map(o => o.textContent as string);
