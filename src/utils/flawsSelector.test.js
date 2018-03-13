import deepFreeze from 'deep-freeze';
import { flawsOptionsSelector } from './flawsSelector';

it('should return correct map for flaw options', () => {
  const state = {
    character: {
      basicInfo: {
        clan: ''
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

  const result = flawsOptionsSelector(state);

  expect(result.has('Amnesia')).toBeFalsy();
  expect(result.get('Addiction')).toEqual({ points: 2 });
  expect(result.get('Archaic')).toEqual({ points: 2 });
});
