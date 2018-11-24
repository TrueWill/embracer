import jsPDF from 'jspdf';
import * as simple from '../selectors/simple';

const sizeUSLetter = [279.4, 215.9];
const defaultFont = 'times';
const defaultLineWidth = 0.2;
const dotRadius = 1.5;
const dotSpacing = 0.75;
const columnWidth = 55;

const pointsToMm = points => points / 2.835;

const printDots = (doc, dots, maxDots, x, y) => {
  doc.setLineWidth(defaultLineWidth);

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

  doc.text(simple.getArchetype(state), 40, 40);
  printTrait(doc, 'This is a test', 4, 5, 0, 50);

  // Downloads
  doc.save('character.pdf');
};

export default exportPdf;
