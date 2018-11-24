import jsPDF from 'jspdf';
import * as simple from '../selectors/simple';

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
const dotRadius = 1.5;
const dotSpacing = 0.75;
let currentYPosition;

const moveToNextLine = () => (currentYPosition += defaultPageLineHeight);

const pointsToMm = points => points / 2.835;

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

  for (let i = 0; i < maxDots; i++) {
    const xOffset = dotRadius + i * dotRadius * 2 + i * dotSpacing;
    const style = i < dots ? 'FD' : 'S';
    doc.circle(x + xOffset, y, dotRadius, style);
  }
};

const getDotsWidth = maxDots =>
  dotRadius * 2 * maxDots + dotSpacing * (maxDots - 1);

const printTrait = (doc, displayName, dots, maxDots, x, y) => {
  doc.setFont(defaultFont);
  doc.setFontType('normal');
  doc.setFontSize(defaultFontSize);
  doc.text(displayName, x, y);

  const dotsWidth = getDotsWidth(maxDots);
  const xOffset = columnWidth - dotsWidth;
  const yOffset = -pointsToMm(doc.getLineHeight() / 2) + dotRadius;

  printDots(doc, dots, maxDots, x + xOffset, y + yOffset);
};

const exportPdf = state => {
  const doc = new jsPDF({
    unit: 'mm',
    format: sizeUSLetter // eventually should allow A4 - affects column width
  });

  currentYPosition = topMargin;

  const bloodline = simple.getBloodline(state);
  const clan = simple.getClanName(state) + (bloodline ? ` (${bloodline})` : '');

  printLine(doc, 'Player:', leftMargin);
  printLine(doc, 'Character:', leftMargin);
  printLine(doc, 'Archetype: ' + simple.getArchetype(state), leftMargin);
  print(doc, 'Clan: ' + clan, leftMargin);
  print(
    doc,
    'Setting/Sect: ' + simple.getSettingName(state),
    leftMargin + columnWidth + gutter
  );
  printLine(doc, 'Title:', leftMargin + (columnWidth + gutter) * 2);
  printTrait(doc, 'This is a test', 4, 5, 0, 50);

  // Downloads
  doc.save('character.pdf');
};

export default exportPdf;
