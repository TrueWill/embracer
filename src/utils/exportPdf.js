import Pdf from './Pdf';
import * as simple from '../selectors/simple';
import getGenerationDetails from '../selectors/getGenerationDetails';

const exportPdf = state => {
  const pdf = new Pdf();

  const bloodline = simple.getBloodline(state);
  const clan = simple.getClanName(state) + (bloodline ? ` (${bloodline})` : '');
  const generationDetails = getGenerationDetails(state);

  pdf.printPageHeader();
  pdf.printLine('Player:', pdf.column1XPosition); // TODO: Consider using method
  pdf.printLine('Character:', pdf.column1XPosition);
  pdf.printLine(
    'Archetype: ' + simple.getArchetype(state),
    pdf.column1XPosition
  );
  pdf.print('Clan: ' + clan, pdf.column1XPosition);
  pdf.print(
    'Setting/Sect: ' + simple.getSettingName(state),
    pdf.column2XPosition
  );
  pdf.printLine(`Title: ${generationDetails.title}`, pdf.column3XPosition);

  pdf.printAttributes(state);
  pdf.printSkills(state);
  pdf.printBackgrounds(state);
  pdf.printDisciplines(state);
  pdf.printMeritsFlaws(state);
  pdf.printBlood(generationDetails);
  pdf.printWillpower();
  pdf.printMorality(state);
  pdf.printHealth();
  pdf.printXP(state);
  pdf.printBeastTraits();
  pdf.printStatus();
  pdf.printFooter();

  pdf.downloadAs('character.pdf');
};

export default exportPdf;
