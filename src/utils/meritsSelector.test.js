import deepFreeze from 'deep-freeze';
import { meritsSelector, meritsOptionsSelector } from './meritsSelector';

it('should return correct initial values for merits', () => {
  const state = {
    character: {
      merits: [],
      flaws: [],
      morality: {
        path: 'Humanity'
      }
    }
  };

  deepFreeze(state);

  const result = meritsSelector(state);

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
      ],
      morality: {
        path: 'Humanity'
      }
    }
  };

  deepFreeze(state);

  const result = meritsSelector(state);

  expect(result).toEqual({
    selected: state.character.merits,
    currentPoints: 6,
    availablePoints: 1
  });
});

it('should include morality merits', () => {
  const state = {
    character: {
      merits: [
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
      ],
      morality: {
        path: 'Path of Metamorphosis',
        meritPoints: 2,
        startingDots: 4
      }
    }
  };

  deepFreeze(state);

  const result = meritsSelector(state);

  expect(result).toEqual({
    selected: state.character.merits,
    currentPoints: 6,
    availablePoints: 1
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

  const result = meritsOptionsSelector(state);

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

  const result = meritsOptionsSelector(state);

  expect(result.has('Ambidextrous')).toBeFalsy();
  expect(result.has('Calm Heart')).toBeFalsy();
  expect(result.get('Acute Sense')).toEqual({ points: 1 });
  expect(result.get('Additional Uncommon Discipline')).toEqual({ points: 5 });
  expect(result.get('Whisper of Life')).toEqual({ points: 1 });
  expect(result.has('Blood of the Tzimisce')).toBeFalsy();
  expect(result.get('Szlachta')).toBeFalsy();
  expect(result.has('Sophistry')).toBeFalsy();
});
