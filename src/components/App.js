import React from 'react';
import { Route } from 'react-router-dom';
import BasicInfoContainer from '../containers/BasicInfoContainer';
import Attributes from './Attributes';
import Skills from './Skills';

const App = () => (
  <div>
    <h2>Embracer</h2>
    <BasicInfoContainer />
    <Route exact path="/" component={Attributes} />
    <Route path="/skills" component={Skills} />
  </div>
);

export default App;
