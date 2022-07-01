import { within } from '@testing-library/react';
// Utilities for use in unit tests.

export const noop = () => {};

/** Values will be strings. */
export const getOptionValues2 = select =>
  within(select)
    .getAllByRole('option')
    .map(o => o.getAttribute('value'));

export const getOptionItems2 = select =>
  within(select)
    .getAllByRole('option')
    .map(o => o.text);

export const getFirstSelect = wrapper => wrapper.find('select').first();
export const getSecondSelect = wrapper => wrapper.find('select').at(1);

export const getSelectedValue = select => select.props().value;

export const getOptionValues = select =>
  select.find('option').map(o => o.props().value);

export const getOptionItems = select =>
  select.find('option').map(o => o.render().text());

export const changeSelectedValue = (select, value) =>
  select.simulate('change', { target: { value } });
