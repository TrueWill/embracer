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
import DisciplinesContainer from '../containers/DisciplinesContainer';
import MeritsFlawsContainer from '../containers/MeritsFlawsContainer';
import XPContainer from '../containers/XPContainer';

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

const disciplines = (
  <div>
    <DisciplinesContainer affinity="inClan" />
    <hr />
    <DisciplinesContainer affinity="outOfClan" />
  </div>
);

const meritsFlaws = (
  <div>
    <MeritsFlawsContainer type="merits" />
    <hr />
    <MeritsFlawsContainer type="flaws" />
  </div>
);

const App = () => (
  <div>
    <h2>Embracer</h2>
    <BasicInfoContainer />
    <XPContainer />
    <Link to="/">Attributes</Link> |
    <Link to="/skills">Skills</Link> |
    <Link to="/backgrounds">Backgrounds</Link> |
    <Link to="/disciplines">Disciplines</Link> |
    <Link to="/merits_flaws">Merits / Flaws</Link>
    <Route exact path="/" component={AttributesContainer} />
    <Route path="/skills" render={() => skills} />
    <Route path="/backgrounds" render={() => backgrounds} />
    <Route path="/disciplines" render={() => disciplines} />
    <Route path="/merits_flaws" render={() => meritsFlaws} />
  </div>
);

export default App;
