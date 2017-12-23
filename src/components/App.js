import React from 'react';
import { Route } from 'react-router-dom';
import BasicInfoContainer from '../containers/BasicInfoContainer';
import Attributes from './Attributes';
import Skills from './Skills';
import Dots from './Dots';
import Rank from './Rank';

const App = () => (
  <div>
    <h2>Embracer</h2>
    <Dots level={1} max={3} />
    <Rank dots={[7, 5, 3]} onChange={e => console.log(e.target.value)} />
    <BasicInfoContainer />
    <Route exact path="/" component={Attributes} />
    <Route path="/skills" component={Skills} />
  </div>
);

export default App;
