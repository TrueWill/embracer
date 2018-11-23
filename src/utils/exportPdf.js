import jsPDF from 'jspdf';
import * as simple from '../selectors/simple';

const sizeUSLetter = [279.4, 215.9];
const defaultLineWidth = 0.2;
const dotRadius = 1.5;
const dotSpacing = 0.75;

const printDots = (doc, dots, maxDots, x, y) => {
  doc.setLineWidth(defaultLineWidth);

  for (let i = 0; i < maxDots; i++) {
    const xOffset = dotRadius + i * dotRadius * 2 + i * dotSpacing;
    const style = i < dots ? 'FD' : 'S';
    doc.circle(x + xOffset, y, dotRadius, style);
  }
};

const exportPdf = state => {
  const doc = new jsPDF({
    unit: 'mm',
    format: sizeUSLetter // eventually should allow A4
  });

  doc.text(simple.getArchetype(state), 1, 1);
  printDots(doc, 5, 10, 0, 50);

  // Downloads
  doc.save('character.pdf');
};

export default exportPdf;
