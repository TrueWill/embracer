import React from 'react';
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
import MeritsContainer from '../containers/MeritsContainer';
import FlawsContainer from '../containers/FlawsContainer';
import XPContainer from '../containers/XPContainer';
import BloodContainer from '../containers/BloodContainer';
import PencilEraserContainer from '../containers/PencilEraserContainer';
import MoralityContainer from '../containers/MoralityContainer';
import Section from '../components/Section';

const App = () => (
  <div className="container-fluid">
    <h1>Embracer</h1>
    <Section header="Character">
      <ArchetypeContainer />
      <ClanContainer />
      <PencilEraserContainer />
    </Section>
    <XPContainer />
    <AttributesContainer />
    <TraitCategoryContainer
      categoryName="skills"
      traitNames={skillTraitNames}
      traitDisplayNameOverride={skillTraitDisplayNameOverride}
    />

    <div className="row">
      <div className="col-sm-7">
        <div className="container-fluid">
          <TraitCategoryContainer
            categoryName="backgrounds"
            traitNames={backgroundTraitNames}
            traitDisplayNameOverride={backgroundTraitDisplayNameOverride}
          />
        </div>
      </div>
      <div className="col-sm-5">
        <div className="container-fluid">
          <DisciplinesContainer affinity="inClan" />
          <DisciplinesContainer affinity="outOfClan" />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-6">
        <div className="container-fluid">
          <MeritsContainer />
        </div>
      </div>
      <div className="col-sm-6">
        <div className="container-fluid">
          <FlawsContainer />
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-sm-6">
        <div className="container-fluid">
          <BloodContainer />
        </div>
      </div>
      <div className="col-sm-6">
        <div className="container-fluid">
          <MoralityContainer />
        </div>
      </div>
    </div>
  </div>
);

export default App;
