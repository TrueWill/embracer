import jsPDF from 'jspdf';
import getDots from './getDots';
import { capitalizeFirstLetter } from './stringUtils';
import * as simple from '../selectors/simple';
import getGenerationDetails from '../selectors/getGenerationDetails';
import {
  attributeTraitNames,
  attributeMaxDots,
  bonusAttributeMaxDots,
  standardTraitMaxDots,
  skillTraitDisplayNameOverride,
  backgroundTraitDisplayNameOverride,
  startingWillpower,
  humanity,
  moralityMaxDotsHumanity,
  moralityMaxDotsPath
} from '../constants/characterOptions';

// Units are mm
const sizeUSLetter = [279.4, 215.9];
const topMargin = 20;
const leftMargin = 15;
const columnWidth = 55;
const gutter = 8;
const defaultFont = 'times';
const defaultFontSize = 10;
const defaultDrawLineWidth = 0.2;
const defaultPageLineHeight = 6;
const dotRadius = 1.2;
const dotSpacing = 0.75;
const attributesTopMargin = 50;
const skillsTopMargin = 72;
const skillsRows = 10;
const midsectionTopMargin = 135;
const bloodSectionTopMargin = 185;
const startingDotsProperty = 'availableStartingDots';
let currentYPosition;

const moveToNextLine = () => (currentYPosition += defaultPageLineHeight);
const moveToPreviousLine = () => (currentYPosition -= defaultPageLineHeight);

const getColumnXPosition = columnNumber =>
  leftMargin + (columnWidth + gutter) * (columnNumber - 1);

const column1XPosition = getColumnXPosition(1);
const column2XPosition = getColumnXPosition(2);
const column3XPosition = getColumnXPosition(3);

const print = (doc, text, x) => {
  doc.setFont(defaultFont);
  doc.setFontType('normal');
  doc.setFontSize(defaultFontSize);
  doc.text(text, x, currentYPosition);
};

const printLine = (doc, text, x) => {
  print(doc, text, x);
  moveToNextLine();
};

const printDots = (doc, dots, maxDots, x, y) => {
  doc.setLineWidth(defaultDrawLineWidth);

  const yOffset = -dotRadius;

  for (let i = 0; i < maxDots; i++) {
    const xOffset = dotRadius + i * dotRadius * 2 + i * dotSpacing;
    const style = i < dots ? 'FD' : 'S';
    doc.circle(x + xOffset, y + yOffset, dotRadius, style);
  }
};

const getDotsWidth = maxDots =>
  dotRadius * 2 * maxDots + dotSpacing * (maxDots - 1);

const printTraitLine = (doc, displayName, dots, maxDots, x) => {
  const dotsWidth = getDotsWidth(maxDots);
  const xOffset = columnWidth - dotsWidth;

  print(doc, displayName, x);
  printDots(doc, dots, maxDots, x + xOffset, currentYPosition);
  moveToNextLine();
};

const printAttributes = (doc, state) => {
  const attributes = simple.getAttributes(state);

  currentYPosition = attributesTopMargin;

  for (let i = 0; i < attributeTraitNames.length; i++) {
    const name = attributeTraitNames[i];
    const columnXPosition = getColumnXPosition(i + 1);

    printTraitLine(
      doc,
      capitalizeFirstLetter(name),
      getDots(attributes[name]),
      attributeMaxDots,
      columnXPosition
    );

    printTraitLine(
      doc,
      'Bonus Attributes',
      0,
      bonusAttributeMaxDots,
      columnXPosition
    );

    print(doc, `Focus: ${simple.getFocus(state, name) || ''}`, columnXPosition);

    moveToPreviousLine();
    moveToPreviousLine();
  }
};

const getTraitNames = traits => {
  const names = Object.keys(traits).filter(x => x !== startingDotsProperty);

  names.sort();

  return names;
};

const printSkills = (doc, state) => {
  const skills = simple.getSkills(state);
  const skillNames = getTraitNames(skills);

  for (let i = 0; i < skillNames.length; i++) {
    const name = skillNames[i];
    const displayName =
      skillTraitDisplayNameOverride[name] || capitalizeFirstLetter(name);
    const column = Math.floor(i / skillsRows) + 1;

    if (i % skillsRows === 0) {
      currentYPosition = skillsTopMargin;
    }

    printTraitLine(
      doc,
      displayName,
      getDots(skills[name]),
      standardTraitMaxDots,
      getColumnXPosition(column)
    );
  }
};

const printBackgrounds = (doc, state) => {
  const backgrounds = simple.getBackgrounds(state);
  const backgroundNames = getTraitNames(backgrounds);

  currentYPosition = midsectionTopMargin;

  backgroundNames.forEach(name => {
    const displayName =
      backgroundTraitDisplayNameOverride[name] || capitalizeFirstLetter(name);

    printTraitLine(
      doc,
      displayName,
      getDots(backgrounds[name]),
      standardTraitMaxDots,
      column1XPosition
    );
  });
};

const printDisciplinesForAffinity = (doc, state, affinity) => {
  const disciplines = simple.getDisciplines(state)[affinity];
  const disciplineNames = getTraitNames(disciplines);

  disciplineNames.forEach(name => {
    printTraitLine(
      doc,
      name + (affinity === 'outOfClan' ? '*' : ''),
      getDots(disciplines[name]),
      standardTraitMaxDots,
      column2XPosition
    );
  });
};

const printDisciplines = (doc, state) => {
  currentYPosition = midsectionTopMargin;

  printDisciplinesForAffinity(doc, state, 'inClan');
  printDisciplinesForAffinity(doc, state, 'outOfClan');
  printLine(doc, '* - Out-of-clan', column2XPosition);
};

const getMeritDescription = merit => {
  const timesPurchased = merit.timesPurchased || 1;
  const timesText = timesPurchased === 1 ? '' : ` X ${timesPurchased}`;

  return `${merit.name} (${merit.points}pt M${timesText})`;
};

const getFlawDescription = flaw => `${flaw.name} (${flaw.points}pt F)`;

const printMeritsFlaws = (doc, state) => {
  const merits = simple.getSelectedMerits(state);

  currentYPosition = midsectionTopMargin;

  merits.forEach(merit => {
    printLine(doc, getMeritDescription(merit), column3XPosition);
  });

  const flaws = simple.getSelectedFlaws(state);

  flaws.forEach(flaw => {
    printLine(doc, getFlawDescription(flaw), column3XPosition);
  });
};

const printBlood = (doc, state) => {
  const generationDetails = getGenerationDetails(state);

  currentYPosition = bloodSectionTopMargin;

  printLine(
    doc,
    `Blood Pool: ${generationDetails.bloodPool}`,
    column1XPosition
  );

  printLine(
    doc,
    `Blood/Turn: ${generationDetails.bloodPerTurn}`,
    column1XPosition
  );

  printLine(
    doc,
    `Attribute Bonus: ${generationDetails.attributeBonus}`,
    column1XPosition
  );
};

const printWillpower = doc => {
  currentYPosition = bloodSectionTopMargin;

  printLine(doc, `Willpower: ${startingWillpower}`, column2XPosition);
};

const printMorality = (doc, state) => {
  currentYPosition = bloodSectionTopMargin;

  const morality = simple.getMorality(state);
  const path = morality.path;

  const maxDots =
    path === humanity ? moralityMaxDotsHumanity : moralityMaxDotsPath;

  printLine(doc, path, column3XPosition);

  printDots(
    doc,
    getDots(morality),
    maxDots,
    column3XPosition,
    currentYPosition
  );
};

const exportPdf = state => {
  const doc = new jsPDF({
    unit: 'mm',
    format: sizeUSLetter // eventually should allow A4 - affects column width
  });

  currentYPosition = topMargin;

  const bloodline = simple.getBloodline(state);
  const clan = simple.getClanName(state) + (bloodline ? ` (${bloodline})` : '');

  printLine(doc, 'Player:', column1XPosition);
  printLine(doc, 'Character:', column1XPosition);
  printLine(doc, 'Archetype: ' + simple.getArchetype(state), column1XPosition);
  print(doc, 'Clan: ' + clan, column1XPosition);
  print(doc, 'Setting/Sect: ' + simple.getSettingName(state), column2XPosition);
  printLine(doc, 'Title:', column3XPosition);

  printAttributes(doc, state);
  printSkills(doc, state);
  printBackgrounds(doc, state);
  printDisciplines(doc, state);
  printMeritsFlaws(doc, state);
  printBlood(doc, state);
  printWillpower(doc);
  printMorality(doc, state);

  // Downloads
  doc.save('character.pdf');
};

export default exportPdf;
