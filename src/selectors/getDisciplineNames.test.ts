import deepFreeze from 'deep-freeze';
import getDisciplineNames from './getDisciplineNames';
import { createMockRootState } from '../test-utils/mockState';

it('should return empty for both affinities if no clan selected', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        clan: { name: '' }
      },
      disciplines: {
        inClan: {},
        outOfClan: {},
        rituals: {
          necromantic: [],
          thaumaturgic: []
        }
      }
    }
  });

  deepFreeze(state);

  const result = getDisciplineNames(state);

  expect(result).toEqual({
    inClan: [],
    outOfClan: []
  });
});

it('should return correct values for Brujah', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        clan: { name: 'Brujah' }
      },
      disciplines: {
        inClan: {},
        outOfClan: {},
        rituals: {
          necromantic: [],
          thaumaturgic: []
        }
      }
    }
  });

  deepFreeze(state);

  const result = getDisciplineNames(state);

  expect(result).toEqual({
    inClan: ['Celerity', 'Potence', 'Presence'],
    outOfClan: ['Animalism', 'Auspex', 'Dominate', 'Fortitude', 'Obfuscate']
  });
});

it('should return correct initial values for Caitiff', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        clan: { name: 'Caitiff' }
      },
      disciplines: {
        inClan: {},
        outOfClan: {},
        rituals: {
          necromantic: [],
          thaumaturgic: []
        }
      }
    }
  });

  deepFreeze(state);

  const result = getDisciplineNames(state);

  expect(result).toEqual({
    inClan: [
      'Animalism',
      'Auspex',
      'Celerity',
      'Dominate',
      'Fortitude',
      'Obfuscate',
      'Potence',
      'Presence'
    ],
    outOfClan: []
  });
});

it('should return correct values for Caitiff after some in-clan selected', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        clan: { name: 'Caitiff' }
      },
      disciplines: {
        inClan: {
          Celerity: {
            startingDots: 2
          }
        },
        outOfClan: {},
        rituals: {
          necromantic: [],
          thaumaturgic: []
        }
      }
    }
  });

  deepFreeze(state);

  const result = getDisciplineNames(state);

  expect(result).toEqual({
    inClan: [
      'Animalism',
      'Auspex',
      'Celerity',
      'Dominate',
      'Fortitude',
      'Obfuscate',
      'Potence',
      'Presence'
    ],
    outOfClan: []
  });
});

it('should return correct values for Caitiff after all in-clan selected', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        clan: { name: 'Caitiff' }
      },
      disciplines: {
        inClan: {
          Celerity: {
            startingDots: 2
          },
          Obfuscate: {
            startingDots: 1
          },
          Potence: {
            startingDots: 1
          }
        },
        outOfClan: {},
        rituals: {
          necromantic: [],
          thaumaturgic: []
        }
      }
    }
  });

  deepFreeze(state);

  const result = getDisciplineNames(state);

  expect(result).toEqual({
    inClan: ['Celerity', 'Obfuscate', 'Potence'],
    outOfClan: ['Animalism', 'Auspex', 'Dominate', 'Fortitude', 'Presence']
  });
});

it('should return correct values for bloodline', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        clan: {
          name: 'Assamite',
          bloodline: 'Vizier',
          meritPoints: 2
        }
      },
      disciplines: {
        inClan: {},
        outOfClan: {},
        rituals: {
          necromantic: [],
          thaumaturgic: []
        }
      }
    }
  });

  deepFreeze(state);

  const result = getDisciplineNames(state);

  expect(result).toEqual({
    inClan: ['Auspex', 'Celerity', 'Quietus'],
    outOfClan: [
      'Animalism',
      'Dominate',
      'Fortitude',
      'Obfuscate',
      'Potence',
      'Presence'
    ]
  });
});
