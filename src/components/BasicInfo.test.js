import React from 'react';
import { shallow } from 'enzyme';
import BasicInfo from './BasicInfo';

it('renders without crashing', () => {
  const character = {
    archetype: '',
    clan: ''
  };

  const actions = {};

  shallow(<BasicInfo character={character} actions={actions} />);
});
