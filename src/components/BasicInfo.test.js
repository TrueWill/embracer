import React from 'react';
import { shallow } from 'enzyme';
import BasicInfo from './BasicInfo';

it('should render without crashing', () => {
  shallow(<BasicInfo />);
});
