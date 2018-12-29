import React from 'react';
import { shallow } from 'enzyme';
import {
  noop,
  getFirstSelect,
  getSelectedValue,
  getOptionItems,
  changeSelectedValue
} from '../utils/testUtils';
import Merits from './Merits';

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

const getMeritsSelect = getFirstSelect;

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

it('should calculate descriptions', () => {
  const optionsMap = new Map([
    ['Arcane', { points: 1 }],
    ['Skill Aptitude', { points: 2, multiple: true }]
  ]);
  const wrapper = getWrapper(optionsMap);

  expect(getOptionItems(getMeritsSelect(wrapper))).toEqual([
    '(not selected)',
    'Arcane (1 point)',
    'Skill Aptitude* (2 points)'
  ]);
});

it('should display selected when merit purchased multiple times', () => {
  const optionsMap = new Map([
    ['Skill Aptitude', { points: 2, multiple: true }]
  ]);
  const selected = [
    {
      name: 'Arcane',
      points: 1
    },
    {
      name: 'Skill Aptitude',
      points: 2,
      timesPurchased: 3
    }
  ];
  const wrapper = getWrapper(optionsMap, selected);

  const items = wrapper.find('li').map(o => o.render().text().trim());
  expect(items).toEqual(['Arcane (1 point)', 'Skill Aptitude (2 points X 3)']);
});
