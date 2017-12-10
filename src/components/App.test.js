import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

it('renders without crashing', () => {
  const character = {
    archetype: '',
    clan: ''
  };

  shallow(<App character={character} />);
});
