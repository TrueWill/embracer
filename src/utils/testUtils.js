// Utilities for use in unit tests, typically for use with enzyme.

export const noop = () => {};

export const getFirstSelect = wrapper => wrapper.find('select').first();
export const getSecondSelect = wrapper => wrapper.find('select').at(1);

export const getSelectedValue = select => select.props().value;

export const getOptionValues = select =>
  select.find('option').map(o => o.props().value);

export const changeSelectedValue = (select, value) =>
  select.simulate('change', { target: { value } });
