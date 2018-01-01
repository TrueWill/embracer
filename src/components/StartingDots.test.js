import React from 'react';
import { shallow } from 'enzyme';
import StartingDots from './StartingDots';

it('should render without crashing', () => {
  shallow(
    <StartingDots
      available={[{ dots: 1, count: 1 }]}
      value={1}
      onChange={() => {}}
    />
  );
});

it('should display current value and clear when none available', () => {
  const wrapper = shallow(
    <StartingDots available={[]} value={1} onChange={() => {}} />
  );

  expect(wrapper.find('select').props().value).toBe(1);
  expect(wrapper.find('option').map(o => o.props().value)).toEqual([1, 0]);
});
