import React from 'react';
import { shallow } from 'enzyme';
import {
  noop,
  getFirstSelect,
  getSelectedValue,
  getOptionValues
} from '../utils/testUtils';
import StartingDots from './StartingDots';

const getDotsSelect = getFirstSelect;

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

  const dotsSelect = getDotsSelect(wrapper);
  expect(getSelectedValue(dotsSelect)).toBe(1);
  expect(getOptionValues(dotsSelect)).toEqual([0, 1]);
});

it('should display only clear when no current value and none available', () => {
  const wrapper = shallow(<StartingDots available={[]} onChange={noop} />);

  const dotsSelect = getDotsSelect(wrapper);
  expect(getSelectedValue(dotsSelect)).toBe(0);
  expect(getOptionValues(dotsSelect)).toEqual([0]);
});

it('should display only clear and other values when no current value', () => {
  const wrapper = shallow(
    <StartingDots
      available={[{ dots: 4, count: 1 }, { dots: 3, count: 2 }]}
      onChange={noop}
    />
  );

  const dotsSelect = getDotsSelect(wrapper);
  expect(getSelectedValue(dotsSelect)).toBe(0);
  expect(getOptionValues(dotsSelect)).toEqual([0, 4, 3]);
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

  const dotsSelect = getDotsSelect(wrapper);
  expect(getSelectedValue(dotsSelect)).toBe(2);
  expect(getOptionValues(dotsSelect)).toEqual([0, 2, 4, 3, 1]);
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

  const dotsSelect = getDotsSelect(wrapper);
  expect(getSelectedValue(dotsSelect)).toBe(2);
  expect(getOptionValues(dotsSelect)).toEqual([0, 2, 4, 3, 1]);
});

it('should exclude values with 0 counts unless current', () => {
  const wrapper = shallow(
    <StartingDots
      available={[
        { dots: 4, count: 1 },
        { dots: 3, count: 0 },
        { dots: 2, count: 0 },
        { dots: 1, count: 4 }
      ]}
      value={2}
      onChange={noop}
    />
  );

  const dotsSelect = getDotsSelect(wrapper);
  expect(getSelectedValue(dotsSelect)).toBe(2);
  expect(getOptionValues(dotsSelect)).toEqual([0, 2, 4, 1]);
});

it('should not include clear as an option if disallow clear', () => {
  const wrapper = shallow(
    <StartingDots
      available={[
        { dots: 4, count: 1 },
        { dots: 3, count: 2 },
        { dots: 1, count: 4 }
      ]}
      value={2}
      disallowClear={true}
      onChange={noop}
    />
  );

  const dotsSelect = getDotsSelect(wrapper);
  expect(getSelectedValue(dotsSelect)).toBe(2);
  expect(getOptionValues(dotsSelect)).toEqual([2, 4, 3, 1]);
});
