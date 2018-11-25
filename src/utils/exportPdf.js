import jsPDF from 'jspdf';
import getDots from './getDots';
import { capitalizeFirstLetter } from './stringUtils';
import * as simple from '../selectors/simple';
import {
  attributeTraitNames,
  attributeMaxDots,
  bonusAttributeMaxDots
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
const defaultPageLineHeight = 7;
const dotRadius = 1.2;
const dotSpacing = 0.75;
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

const printTrait = (doc, displayName, dots, maxDots, x) => {
  const dotsWidth = getDotsWidth(maxDots);
  const xOffset = columnWidth - dotsWidth;

  print(doc, displayName, x);
  printDots(doc, dots, maxDots, x + xOffset, currentYPosition);
};

const printAttributes = (doc, state) => {
  const attributes = simple.getAttributes(state);

  for (let i = 0; i < attributeTraitNames.length; i++) {
    const name = attributeTraitNames[i];
    const columnXPosition = getColumnXPosition(i + 1);

    printTrait(
      doc,
      capitalizeFirstLetter(name),
      getDots(attributes[name]),
      attributeMaxDots,
      columnXPosition
    );

    moveToNextLine();

    printTrait(
      doc,
      'Bonus Attributes',
      0,
      bonusAttributeMaxDots,
      columnXPosition
    );

    moveToNextLine();

    print(doc, `Focus: ${simple.getFocus(state, name) || ''}`, columnXPosition);

    moveToPreviousLine();
    moveToPreviousLine();
  }
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

  // Downloads
  doc.save('character.pdf');
};

export default exportPdf;
