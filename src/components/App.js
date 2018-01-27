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
import MeritsFlaws from '../components/MeritsFlaws';

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

// TODO: working
const meritsFlaws = (
  <MeritsFlaws
    options={[{ name: 'Plus', points: 3 }, { name: 'Minus', points: -1 }]}
    selected={[
      { name: 'One', points: 1 },
      { name: 'Two', points: 2 },
      { name: 'Minus Three', points: -3 }
    ]}
  />
);

const App = () => (
  <div>
    <h2>Embracer</h2>
    <BasicInfoContainer />
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
