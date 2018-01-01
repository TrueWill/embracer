import React from 'react';
import { shallow } from 'enzyme';
import StartingDots from './StartingDots';

const getSelectedValue = wrapper => wrapper.find('select').props().value;

const getOptionValues = wrapper =>
  wrapper.find('option').map(o => o.props().value);

const noop = () => {};

it('should render without crashing', () => {
  shallow(
    <StartingDots
      available={[{ dots: 1, count: 1 }]}
      value={1}
      onChange={noop}
    />
  );
});

it('should display current value and clear when none available', () => {
  const wrapper = shallow(
    <StartingDots available={[]} value={1} onChange={noop} />
  );

  expect(getSelectedValue(wrapper)).toBe(1);
  expect(getOptionValues(wrapper)).toEqual([0, 1]);
});

it('should display only clear when no current value and none available', () => {
  const wrapper = shallow(<StartingDots available={[]} onChange={noop} />);

  expect(getSelectedValue(wrapper)).toBe(0);
  expect(getOptionValues(wrapper)).toEqual([0]);
});

it('should display only clear and other values when no current value', () => {
  const wrapper = shallow(
    <StartingDots
      available={[{ dots: 4, count: 1 }, { dots: 3, count: 2 }]}
      onChange={noop}
    />
  );

  expect(getSelectedValue(wrapper)).toBe(0);
  expect(getOptionValues(wrapper)).toEqual([0, 4, 3]);
});

it('should display current value, other values, and clear', () => {
  const wrapper = shallow(
    <StartingDots
      available={[
        { dots: 4, count: 1 },
        { dots: 3, count: 2 },
        { dots: 1, count: 4 }
      ]}
      value={2}
      onChange={noop}
    />
  );

  expect(getSelectedValue(wrapper)).toBe(2);
  expect(getOptionValues(wrapper)).toEqual([0, 2, 4, 3, 1]);
});

it('should exclude available matching current value', () => {
  const wrapper = shallow(
    <StartingDots
      available={[
        { dots: 4, count: 1 },
        { dots: 3, count: 2 },
        { dots: 2, count: 2 },
        { dots: 1, count: 4 }
      ]}
      value={2}
      onChange={noop}
    />
  );

  expect(getSelectedValue(wrapper)).toBe(2);
  expect(getOptionValues(wrapper)).toEqual([0, 2, 4, 3, 1]);
});
