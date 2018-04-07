import React from 'react';
import { shallow } from 'enzyme';
import Merits from './Merits';

const noop = () => {};

const getWrapper = (optionsMap, selected = []) =>
  shallow(
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

// TODO: Enable once enzyme fixes getDerivedStateFromProps calling behavior
xit('should clear state when previously selected value not in new options', () => {
  const optionsMap = new Map();

  optionsMap.set('Arcane', { points: 1 });

  const wrapper = getWrapper(optionsMap);

  changeSelectedValue(getMeritsSelect(wrapper), 'Arcane');

  wrapper.setProps({ optionsMap: new Map() });

  expect(getSelectedValue(getMeritsSelect(wrapper))).toBe('');
});
