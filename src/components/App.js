import React from 'react';
import { Route } from 'react-router-dom';
import {
  skillTraitNames,
  skillTraitDisplayNameOverride
} from '../constants/characterOptions';
import BasicInfoContainer from '../containers/BasicInfoContainer';
import AttributesContainer from '../containers/AttributesContainer';
import TraitCategoryContainer from '../containers/TraitCategoryContainer';

const skills = (
  <TraitCategoryContainer
    categoryName="skills"
    traitNames={skillTraitNames}
    traitDisplayNameOverride={skillTraitDisplayNameOverride}
  />
);

const App = () => (
  <div>
    <h2>Embracer</h2>
    <BasicInfoContainer />
    <Route exact path="/" component={AttributesContainer} />
    <Route path="/skills" render={() => skills} />
  </div>
);

export default App;
