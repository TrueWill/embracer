import deepFreeze from 'deep-freeze';
import meritsFlawsSelector from './meritsFlawsSelector';

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
