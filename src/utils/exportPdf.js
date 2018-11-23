import jsPDF from 'jspdf';
import * as simple from '../selectors/simple';

const exportPdf = state => {
  const doc = new jsPDF({
    unit: 'in',
    format: [11, 8.5] // US Letter; eventually should allow A4
  });

  doc.text(simple.getArchetype(state), 1, 1);

  // Downloads
  doc.save('character.pdf');
};

export default exportPdf;
