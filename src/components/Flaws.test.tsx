import React from 'react';
import { mount } from 'enzyme';
import {
  noop,
  getFirstSelect,
  getSelectedValue,
  changeSelectedValue
} from '../utils/testUtils';
import Flaws from './Flaws';

// TODO: Change to shallow rendering once enzyme fixes getDerivedStateFromProps calling behavior
const getWrapper = (optionsMap, selected = []) =>
  mount(
    <Flaws
      optionsMap={optionsMap}
      selected={selected}
      availablePoints={7}
      addFlaw={noop}
      removeFlaw={noop}
    />
  );

const getFlawsSelect = getFirstSelect;

it('should clear state when previously selected value not in new options', () => {
  const optionsMap = new Map([['Mistrusted', { points: 1 }]]);
  const wrapper = getWrapper(optionsMap);
  changeSelectedValue(getFlawsSelect(wrapper), 'Mistrusted');

  wrapper.setProps({ optionsMap: new Map() });

  expect(getSelectedValue(getFlawsSelect(wrapper))).toBe('');
});

it('should not clear state when previously selected value in new options', () => {
  const optionsMap = new Map([
    ['Mistrusted', { points: 1 }],
    ['Amnesia', { points: 1 }]
  ]);
  const wrapper = getWrapper(optionsMap);
  changeSelectedValue(getFlawsSelect(wrapper), 'Amnesia');

  wrapper.setProps({ optionsMap: new Map([['Amnesia', { points: 1 }]]) });

  expect(getSelectedValue(getFlawsSelect(wrapper))).toBe('Amnesia');
});
