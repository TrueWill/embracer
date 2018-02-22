import deepFreeze from 'deep-freeze';
import meritsFlawsSelector, {
  meritsFlawsOptionsSelector,
  moralityMeritsOptionsSelector
} from './meritsFlawsSelector';

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
      ],
      morality: {
        path: 'Humanity'
      }
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

  const result = meritsFlawsOptionsSelector(state, 'merits');

  expect(result.has('Ambidextrous')).toBeFalsy();
  expect(result.has('Calm Heart')).toBeFalsy();
  expect(result.get('Acute Sense')).toEqual({ points: 1 });
  expect(result.get('Additional Uncommon Discipline')).toEqual({ points: 5 });
  expect(result.get('Whisper of Life')).toEqual({ points: 1 });
  expect(result.has('Blood of the Tzimisce')).toBeFalsy();
  expect(result.get('Szlachta')).toBeFalsy();
  expect(result.has('Sophistry')).toBeFalsy();
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

  const result = meritsFlawsOptionsSelector(state, 'flaws');

  expect(result.has('Amnesia')).toBeFalsy();
  expect(result.get('Addiction')).toEqual({ points: 2 });
  expect(result.get('Archaic')).toEqual({ points: 2 });
});

it('should return correct map for morality merits options when no clan selected', () => {
  const state = {
    character: {
      basicInfo: {
        clan: ''
      }
    }
  };

  deepFreeze(state);

  const result = moralityMeritsOptionsSelector(state);

  expect(result.get('Path of Blood')).toEqual({
    points: 3
  });
});

it('should return correct map for morality merits options when clan discount', () => {
  const state = {
    character: {
      basicInfo: {
        clan: 'Assamite'
      }
    }
  };

  deepFreeze(state);

  const result = moralityMeritsOptionsSelector(state);

  expect(result.get('Path of Blood')).toEqual({
    points: 2
  });
});

it('should return correct map for morality merits options when no clan discount', () => {
  const state = {
    character: {
      basicInfo: {
        clan: 'Giovanni'
      }
    }
  };

  deepFreeze(state);

  const result = moralityMeritsOptionsSelector(state);

  expect(result.get('Path of Blood')).toEqual({
    points: 3
  });
});
