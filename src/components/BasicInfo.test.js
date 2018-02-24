import React from 'react';
import { shallow } from 'enzyme';
import BasicInfo from './BasicInfo';

it('should render without crashing', () => {
  const basicInfo = {
    archetype: '',
    clan: ''
  };

  const actions = {
    updateArchetype: () => {},
    updateClan: () => {}
  };

  shallow(<BasicInfo basicInfo={basicInfo} actions={actions} />);
});
