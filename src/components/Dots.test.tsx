import React from 'react';
import { shallow } from 'enzyme';
import Dots from './Dots';

const unfilledSelector = '.fa-circle-thin';
const filledSelector = '.fa-circle';

it('should render without crashing', () => {
  shallow(<Dots />);
});

it('should use defaults', () => {
  const wrapper = shallow(<Dots />);

  expect(wrapper.find(unfilledSelector)).toHaveLength(5);
  expect(wrapper.find(filledSelector)).toHaveLength(0);
});

it('should work when max level', () => {
  const wrapper = shallow(<Dots level={4} max={4} />);

  expect(wrapper.find(unfilledSelector)).toHaveLength(0);
  expect(wrapper.find(filledSelector)).toHaveLength(4);
});

it('should work when partial level', () => {
  const wrapper = shallow(<Dots level={2} max={5} />);

  expect(wrapper.find(unfilledSelector)).toHaveLength(3);
  expect(wrapper.find(filledSelector)).toHaveLength(2);
});
