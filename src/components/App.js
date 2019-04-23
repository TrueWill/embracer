import React from 'react';
import { version } from '../constants/application';
import {
  skillTraitNames,
  skillTraitDisplayNameOverride,
  backgroundTraitNames,
  backgroundTraitDisplayNameOverride
} from '../constants/characterOptions';
import ExportDocumentContainer from '../containers/ExportDocumentContainer';
import SettingContainer from '../containers/SettingContainer';
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
import ValidationContainer from '../containers/ValidationContainer';
import Section from '../components/Section';
import RitualsContainer from '../containers/RitualsContainer';
import styles from './App.module.css';

export default function App() {
  return (
    <div className="container-fluid">
      <h1>
        Embracer
        <span className={styles.version}> v{version}</span>
      </h1>
      <ExportDocumentContainer />
      <SettingContainer />
      <Section header="Character">
        <ArchetypeContainer />
        <ClanContainer />
        <PencilEraserContainer />
      </Section>
      <React.StrictMode>
        {/* react-select in Archetype fails StrictMode */}
        <ValidationContainer />
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
              <RitualsContainer />
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
        <div className={`row ${styles.attribution}`}>
          <div className="col-sm-12">
            Some terms are copyrighted by or registered trademarks of CCP hf.
            This tool is unofficial, and the author is not affiliated with the
            companies mentioned above.
          </div>
        </div>
      </React.StrictMode>
    </div>
  );
}
