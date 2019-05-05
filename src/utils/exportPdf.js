import Pdf from './Pdf';
import * as simple from '../selectors/simple';
import getGenerationDetails from '../selectors/getGenerationDetails';
import getRituals from '../selectors/getRituals';
import getXP from '../selectors/getXP';

const exportPdf = state => {
  const pdf = new Pdf();

  pdf.printCharacter({
    archetype: simple.getArchetype(state),
    clanName: simple.getClanName(state),
    bloodline: simple.getBloodline(state),
    settingName: simple.getSettingName(state),
    generationDetails: getGenerationDetails(state),
    attributes: simple.getAttributes(state),
    skills: simple.getSkills(state),
    backgrounds: simple.getBackgrounds(state),
    disciplines: simple.getDisciplines(state),
    rituals: getRituals(state),
    merits: simple.getSelectedMerits(state),
    flaws: simple.getSelectedFlaws(state),
    morality: simple.getMorality(state),
    xp: getXP(state)
  });

  pdf.downloadAs('character.pdf');
};

export default exportPdf;
