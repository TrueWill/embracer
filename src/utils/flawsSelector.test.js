import deepFreeze from 'deep-freeze';
import { flawsSelector, flawsOptionsSelector } from './flawsSelector';

it('should return correct values for flaws', () => {
  const state = {
    character: {
      merits: [
        {
          name: 'Calm Heart',
          points: 1
        }
      ],
      flaws: [
        {
          name: 'Bad Sight',
          points: 2
        },
        {
          name: 'Blood Rot',
          points: 5
        }
      ]
    }
  };

  deepFreeze(state);

  const result = flawsSelector(state);

  expect(result).toEqual({
    selected: state.character.flaws,
    currentPoints: 7,
    availablePoints: 0
  });
});

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
