import React from 'react';
import { Route, Link } from 'react-router-dom';
import {
  skillTraitNames,
  skillTraitDisplayNameOverride,
  backgroundTraitNames,
  backgroundTraitDisplayNameOverride
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

const backgrounds = (
  <TraitCategoryContainer
    categoryName="backgrounds"
    traitNames={backgroundTraitNames}
    traitDisplayNameOverride={backgroundTraitDisplayNameOverride}
  />
);

const App = () => (
  <div>
    <h2>Embracer</h2>
    <BasicInfoContainer />
    <Link to="/">Attributes</Link> |
    <Link to="/skills">Skills</Link> |
    <Link to="/backgrounds">Backgrounds</Link>
    <Route exact path="/" component={AttributesContainer} />
    <Route path="/skills" render={() => skills} />
    <Route path="/backgrounds" render={() => backgrounds} />
  </div>
);

export default App;
