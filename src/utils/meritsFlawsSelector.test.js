import deepFreeze from 'deep-freeze';
import meritsFlawsSelector, {
  meritsFlawsOptionsSelector
} from './meritsFlawsSelector';

it('should return correct initial values for merits', () => {
  const state = {
    character: {
      merits: [],
      flaws: []
    }
  };

  deepFreeze(state);

  const result = meritsFlawsSelector(state, 'merits');

  expect(result).toEqual({
    selected: [],
    currentPoints: 0,
    availablePoints: 7
  });
});

it('should return correct values for merits', () => {
  const state = {
    character: {
      merits: [
        {
          name: 'Ambidextrous',
          points: 2
        },
        {
          name: 'Calm Heart',
          points: 1
        },
        {
          name: 'Clear Sighted',
          points: 3
        }
      ],
      flaws: [
        {
          name: 'Bad Sight',
          points: 2
        }
      ]
    }
  };

  deepFreeze(state);

  const result = meritsFlawsSelector(state, 'merits');

  expect(result).toEqual({
    selected: state.character.merits,
    currentPoints: 6,
    availablePoints: 1
  });
});

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

  const result = meritsFlawsSelector(state, 'flaws');

  expect(result).toEqual({
    selected: state.character.flaws,
    currentPoints: 7,
    availablePoints: 0
  });
});

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

  const result = meritsFlawsOptionsSelector(state, 'merits');

  expect(result.has('Ambidextrous')).toBeFalsy();
  expect(result.has('Calm Heart')).toBeFalsy();
  expect(result.get('Acute Sense')).toEqual({ points: 1 });
  expect(result.get('Additional Uncommon Discipline')).toEqual({ points: 5 });
  expect(result.get('Whisper of Life')).toEqual({ points: 1 });
  expect(result.get('Blood of the Tzimisce')).toEqual({ points: 1 });
  expect(result.get('Szlachta')).toEqual({ points: 2 });
  expect(result.has('Sophistry')).toBeFalsy();
});
