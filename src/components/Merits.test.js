import React from 'react';
import { mount } from 'enzyme';
import Merits from './Merits';

// TODO: Remove duplication (enzyme helpers)
const noop = () => {};

// TODO: Change to shallow rendering once enzyme fixes getDerivedStateFromProps calling behavior
const getWrapper = (optionsMap, selected = []) =>
  mount(
    <Merits
      optionsMap={optionsMap}
      selected={selected}
      availablePoints={7}
      addMerit={noop}
      removeMerit={noop}
    />
  );

const getMeritsSelect = wrapper => wrapper.find('select').first();

const getSelectedValue = select => select.props().value;

const changeSelectedValue = (select, value) =>
  select.simulate('change', { target: { value } });

it('should clear state when previously selected value not in new options', () => {
  const optionsMap = new Map([['Zealot', { points: 1 }]]);
  const wrapper = getWrapper(optionsMap);
  changeSelectedValue(getMeritsSelect(wrapper), 'Zealot');

  wrapper.setProps({ optionsMap: new Map() });

  expect(getSelectedValue(getMeritsSelect(wrapper))).toBe('');
});

it('should not clear state when previously selected value in new options', () => {
  const optionsMap = new Map([
    ['Zealot', { points: 1 }],
    ['Arcane', { points: 1 }]
  ]);
  const wrapper = getWrapper(optionsMap);
  changeSelectedValue(getMeritsSelect(wrapper), 'Arcane');

  wrapper.setProps({ optionsMap: new Map([['Arcane', { points: 1 }]]) });

  expect(getSelectedValue(getMeritsSelect(wrapper))).toBe('Arcane');
});
