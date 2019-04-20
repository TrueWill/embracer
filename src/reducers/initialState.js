import {
  attributeTraitNames,
  skillsAvailableStartingDots,
  backgroundsAvailableStartingDots,
  standardTraitMaxDots,
  humanity,
  moralityStartingDotsHumanity
} from '../constants/characterOptions';
import {
  inClanDisciplinesAvailableStartingDots,
  outOfClanDisciplinesAvailableStartingDots
} from '../constants/clanOptions';
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
  mode: {
    isEraser: false
  },
  setting: {
    name: 'Camarilla'
  },
  character: {
    basicInfo: {
      archetype: '',
      clan: { name: '' }
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
      },
      rituals: {
        necromantic: [],
        thaumaturgic: []
      }
    },
    merits: [],
    flaws: [],
    morality: {
      path: humanity,
      startingDots: moralityStartingDotsHumanity
    }
  }
};
