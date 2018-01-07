import {
  attributeTraitNames,
  skillsAvailableStartingDots,
  backgroundsAvailableStartingDots
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
    }
  }
};
