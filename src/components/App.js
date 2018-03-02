import React from 'react';
import { Route, Link } from 'react-router-dom';
import {
  skillTraitNames,
  skillTraitDisplayNameOverride,
  backgroundTraitNames,
  backgroundTraitDisplayNameOverride
} from '../constants/characterOptions';
import ClanContainer from '../containers/ClanContainer';
import ArchetypeContainer from '../containers/ArchetypeContainer';
import AttributesContainer from '../containers/AttributesContainer';
import TraitCategoryContainer from '../containers/TraitCategoryContainer';
import DisciplinesContainer from '../containers/DisciplinesContainer';
import MeritsFlawsContainer from '../containers/MeritsFlawsContainer';
import XPContainer from '../containers/XPContainer';
import BloodContainer from '../containers/BloodContainer';
import PencilEraserContainer from '../containers/PencilEraserContainer';
import MoralityContainer from '../containers/MoralityContainer';
import Section from '../components/Section';

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
  <div className="container-fluid">
    <h1>Embracer</h1>
    <Section header="Character">
      <ArchetypeContainer />
      <ClanContainer />
      <PencilEraserContainer />
    </Section>
    <XPContainer />
    <BloodContainer />
    <hr />
    <Link to="/">Attributes</Link> |
    <Link to="/skills">Skills</Link> |
    <Link to="/backgrounds">Backgrounds</Link> |
    <Link to="/disciplines">Disciplines</Link> |
    <Link to="/merits_flaws">Merits / Flaws</Link> |
    <Link to="/morality">Morality</Link>
    <Route exact path="/" component={AttributesContainer} />
    <Route path="/skills" render={() => skills} />
    <Route path="/backgrounds" render={() => backgrounds} />
    <Route path="/disciplines" render={() => disciplines} />
    <Route path="/merits_flaws" render={() => meritsFlaws} />
    <Route path="/morality" component={MoralityContainer} />
  </div>
);

export default App;
