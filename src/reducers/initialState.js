import {
  attributeTraitNames,
  skillsAvailableStartingDots,
  backgroundsAvailableStartingDots,
  inClanDisciplinesAvailableStartingDots,
  outOfClanDisciplinesAvailableStartingDots,
  standardTraitMaxDots
} from '../constants/characterOptions';
import { setDotsFromStartingDots } from '../utils/categoryStarter';

let backgrounds = {
  availableStartingDots: backgroundsAvailableStartingDots
};

backgrounds = setDotsFromStartingDots(
  backgrounds,
  'generation',
  1,
  standardTraitMaxDots
);

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
    backgrounds,
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
