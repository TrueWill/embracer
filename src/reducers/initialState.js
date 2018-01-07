import {
  skillsAvailableStartingDots,
  backgroundsAvailableStartingDots
} from '../constants/characterOptions';

export default {
  character: {
    basicInfo: {
      archetype: '',
      clan: ''
    },
    attributes: {
      physical: {},
      social: {},
      mental: {}
    },
    skills: {
      availableStartingDots: skillsAvailableStartingDots
    },
    backgrounds: {
      availableStartingDots: backgroundsAvailableStartingDots
    }
  }
};
