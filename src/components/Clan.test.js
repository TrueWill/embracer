import React from 'react';
import { shallow } from 'enzyme';
import { clans } from '../constants/clanOptions';
import Clan from './Clan';

const noop = () => {};

const getWrapper = (clan = { name: '' }, updateClan = noop) =>
  shallow(<Clan clan={clan} updateClan={updateClan} />);

const getClanSelect = wrapper => wrapper.find('select').at(0);
const getBloodlineSelect = wrapper => wrapper.find('select').at(1);

const getSelectedValue = select => select.props().value;

const getOptionValues = select =>
  select.find('option').map(o => o.props().value);

const changeSelectedValue = (select, value) =>
  select.simulate('change', { target: { value } });

it('should render without crashing', () => {
  getWrapper();
});

it('should display clan options', () => {
  const wrapper = getWrapper();
  const clanNames = Array.from(clans.keys());

  expect(getOptionValues(getClanSelect(wrapper))).toEqual(['', ...clanNames]);
});

it('should select current clan', () => {
  const currentClan = 'Tzimisce';
  const wrapper = getWrapper({ name: currentClan });

  expect(getSelectedValue(getClanSelect(wrapper))).toBe(currentClan);
});

it('should not display bloodline options when no clan', () => {
  const wrapper = getWrapper();

  expect(getOptionValues(getBloodlineSelect(wrapper))).toEqual(['']);
});

it('should display bloodline options when clan', () => {
  const wrapper = getWrapper({ name: 'Tzimisce' });

  expect(getOptionValues(getBloodlineSelect(wrapper))).toEqual([
    '',
    'Carpathian',
    'Koldun'
  ]);
});

it('should select current bloodline', () => {
  const currentBloodline = 'Koldun';

  const wrapper = getWrapper({
    name: 'Tzimisce',
    bloodline: currentBloodline,
    meritPoints: 4
  });

  expect(getSelectedValue(getBloodlineSelect(wrapper))).toBe(currentBloodline);
});

it('should update clan', () => {
  const updateClan = jest.fn();
  const wrapper = getWrapper(undefined, updateClan);
  const newClan = 'Tzimisce';

  changeSelectedValue(getClanSelect(wrapper), newClan);

  expect(updateClan.mock.calls.length).toBe(1);
  expect(updateClan.mock.calls[0]).toEqual([newClan]);
});

it('should update bloodline', () => {
  const updateClan = jest.fn();
  const currentClan = 'Tzimisce';
  const wrapper = getWrapper({ name: currentClan }, updateClan);
  const newBloodline = 'Koldun';
  const newBloodlineMeritPoints = 4;

  changeSelectedValue(getBloodlineSelect(wrapper), newBloodline);

  expect(updateClan.mock.calls.length).toBe(1);
  expect(updateClan.mock.calls[0]).toEqual([
    currentClan,
    newBloodline,
    newBloodlineMeritPoints
  ]);
});

it('should clear bloodline when update clan', () => {
  const updateClan = jest.fn();

  const wrapper = getWrapper(
    {
      name: 'Tzimisce',
      bloodline: 'Koldun',
      meritPoints: 4
    },
    updateClan
  );

  const newClan = 'Nosferatu';

  changeSelectedValue(getClanSelect(wrapper), newClan);

  expect(updateClan.mock.calls.length).toBe(1);
  expect(updateClan.mock.calls[0]).toEqual([newClan]);
});
