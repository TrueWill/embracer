import deepFreeze from 'deep-freeze';
import getMeritsOptions from './getMeritsOptions';

it('should return correct map for merit options when clan selected', () => {
  const state = {
    character: {
      basicInfo: {
        clan: 'Tzimisce'
      },
      merits: [
        {
          name: 'Ambidextrous',
          points: 2
        },
        {
          name: 'Calm Heart',
          points: 1
        }
      ],
      flaws: []
    }
  };

  deepFreeze(state);

  const result = getMeritsOptions(state);

  expect(result.has('Ambidextrous')).toBeFalsy();
  expect(result.has('Calm Heart')).toBeFalsy();
  expect(result.get('Acute Sense')).toEqual({ points: 1 });
  expect(result.get('Additional Uncommon Discipline')).toEqual({ points: 5 });
  expect(result.get('Whisper of Life')).toEqual({ points: 1 });
  expect(result.get('Blood of the Tzimisce')).toEqual({ points: 1 });
  expect(result.get('Szlachta')).toEqual({ points: 2 });
  expect(result.has('Sophistry')).toBeFalsy();
});

it('should return correct map for merit options when no clan selected', () => {
  const state = {
    character: {
      basicInfo: {
        clan: ''
      },
      merits: [
        {
          name: 'Ambidextrous',
          points: 2
        },
        {
          name: 'Calm Heart',
          points: 1
        }
      ],
      flaws: []
    }
  };

  deepFreeze(state);

  const result = getMeritsOptions(state);

  expect(result.has('Ambidextrous')).toBeFalsy();
  expect(result.has('Calm Heart')).toBeFalsy();
  expect(result.get('Acute Sense')).toEqual({ points: 1 });
  expect(result.get('Additional Uncommon Discipline')).toEqual({ points: 5 });
  expect(result.get('Whisper of Life')).toEqual({ points: 1 });
  expect(result.has('Blood of the Tzimisce')).toBeFalsy();
  expect(result.get('Szlachta')).toBeFalsy();
  expect(result.has('Sophistry')).toBeFalsy();
});
