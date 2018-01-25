import deepFreeze from 'deep-freeze';
import disciplineNamesSelector from './disciplineNamesSelector';

it('should return empty for both affinities if no clan selected', () => {
  const state = {
    character: {
      basicInfo: {
        clan: ''
      },
      disciplines: {
        inClan: {}
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
        inClan: {}
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

// TODO: Handle Caitiff with/without initial selection
