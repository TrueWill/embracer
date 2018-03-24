import deepFreeze from 'deep-freeze';
import getFlawsOptions from './getFlawsOptions';

it('should return correct map for flaw options', () => {
  const state = {
    character: {
      basicInfo: {
        clan: { name: '' }
      },
      merits: [],
      flaws: [
        {
          name: 'Amnesia',
          points: 1
        }
      ]
    }
  };

  deepFreeze(state);

  const result = getFlawsOptions(state);

  expect(result.has('Amnesia')).toBeFalsy();
  expect(result.get('Addiction')).toEqual({ points: 2 });
  expect(result.get('Archaic')).toEqual({ points: 2 });
});
