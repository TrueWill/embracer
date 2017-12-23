import React from 'react';
import { Route } from 'react-router-dom';
import BasicInfoContainer from '../containers/BasicInfoContainer';
import AttributesContainer from '../containers/AttributesContainer';
import Skills from './Skills';

const App = () => (
  <div>
    <h2>Embracer</h2>
    <BasicInfoContainer />
    <Route exact path="/" component={AttributesContainer} />
    <Route path="/skills" component={Skills} />
  </div>
);

export default App;
