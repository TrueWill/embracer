import deepFreeze from 'deep-freeze';
import disciplineNamesSelector from './disciplineNamesSelector';

it('should return empty for both affinities if no clan selected', () => {
  const state = {
    character: {
      basicInfo: {
        clan: ''
      },
      disciplines: {
        inClan: {},
        outOfClan: {}
      }
    }
  };

  deepFreeze(state);

  const result = disciplineNamesSelector(state);

  expect(result).toEqual({
    inClan: [],
    outOfClan: []
  });
});

it('should return correct values for Brujah', () => {
  const state = {
    character: {
      basicInfo: {
        clan: 'Brujah'
      },
      disciplines: {
        inClan: {},
        outOfClan: {}
      }
    }
  };

  deepFreeze(state);

  const result = disciplineNamesSelector(state);

  expect(result).toEqual({
    inClan: ['Celerity', 'Potence', 'Presence'],
    outOfClan: ['Animalism', 'Auspex', 'Dominate', 'Fortitude', 'Obfuscate']
  });
});

it('should return correct initial values for Caitiff', () => {
  const state = {
    character: {
      basicInfo: {
        clan: 'Caitiff'
      },
      disciplines: {
        inClan: {},
        outOfClan: {}
      }
    }
  };

  deepFreeze(state);

  const result = disciplineNamesSelector(state);

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
  const state = {
    character: {
      basicInfo: {
        clan: 'Caitiff'
      },
      disciplines: {
        inClan: {
          Celerity: {
            startingDots: 2
          }
        },
        outOfClan: {}
      }
    }
  };

  deepFreeze(state);

  const result = disciplineNamesSelector(state);

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
  const state = {
    character: {
      basicInfo: {
        clan: 'Caitiff'
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
        outOfClan: {}
      }
    }
  };

  deepFreeze(state);

  const result = disciplineNamesSelector(state);

  expect(result).toEqual({
    inClan: ['Celerity', 'Obfuscate', 'Potence'],
    outOfClan: ['Animalism', 'Auspex', 'Dominate', 'Fortitude', 'Presence']
  });
});
