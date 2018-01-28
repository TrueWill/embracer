import {
  attributeTraitNames,
  skillsAvailableStartingDots,
  backgroundsAvailableStartingDots,
  inClanDisciplinesAvailableStartingDots,
  outOfClanDisciplinesAvailableStartingDots
} from '../constants/characterOptions';

export default {
  character: {
    basicInfo: {
      archetype: '',
      clan: ''
    },
    attributes: attributeTraitNames.reduce(
      (acc, name) => ({ ...acc, [name]: {} }),
      {}
    ),
    skills: {
      availableStartingDots: skillsAvailableStartingDots
    },
    backgrounds: {
      availableStartingDots: backgroundsAvailableStartingDots
    },
    disciplines: {
      inClan: {
        availableStartingDots: inClanDisciplinesAvailableStartingDots
      },
      outOfClan: {
        availableStartingDots: outOfClanDisciplinesAvailableStartingDots
      }
    },
    merits: [],
    flaws: []
  }
};
