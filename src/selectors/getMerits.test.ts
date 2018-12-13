import deepFreeze from 'deep-freeze';
import getMerits from './getMerits';

it('should return correct initial values for merits', () => {
  const state = {
    character: {
      basicInfo: {
        clan: { name: '' }
      },
      merits: [],
      flaws: [],
      morality: {
        path: 'Humanity'
      }
    }
  };

  deepFreeze(state);

  const result = getMerits(state);

  expect(result).toEqual({
    selected: [],
    currentPoints: 0,
    availablePoints: 7
  });
});

it('should return correct values for merits', () => {
  const state = {
    character: {
      basicInfo: {
        clan: { name: '' }
      },
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

  const result = getMerits(state);

  expect(result).toEqual({
    selected: state.character.merits,
    currentPoints: 6,
    availablePoints: 1
  });
});

it('should return correct values for merits when purchased multiple times', () => {
  const state = {
    character: {
      basicInfo: {
        clan: { name: '' }
      },
      merits: [
        {
          name: 'Skill Aptitude',
          points: 2,
          timesPurchased: 3
        }
      ],
      flaws: [],
      morality: {
        path: 'Humanity'
      }
    }
  };

  deepFreeze(state);

  const result = getMerits(state);

  expect(result).toEqual({
    selected: state.character.merits,
    currentPoints: 6,
    availablePoints: 1
  });
});

it('should include morality merits', () => {
  const state = {
    character: {
      basicInfo: {
        clan: { name: '' }
      },
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

  const result = getMerits(state);

  expect(result).toEqual({
    selected: state.character.merits,
    currentPoints: 6,
    availablePoints: 1
  });
});

it('should include bloodline merits', () => {
  const state = {
    character: {
      basicInfo: {
        clan: {
          name: 'Tzimisce',
          bloodline: 'Koldun',
          meritPoints: 4
        }
      },
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
        }
      ],
      morality: {
        path: 'Humanity'
      }
    }
  };

  deepFreeze(state);

  const result = getMerits(state);

  expect(result).toEqual({
    selected: state.character.merits,
    currentPoints: 5,
    availablePoints: 2
  });
});

it('should include morality and bloodline merits', () => {
  const state = {
    character: {
      basicInfo: {
        clan: {
          name: 'Tzimisce',
          bloodline: 'Koldun',
          meritPoints: 4
        }
      },
      merits: [],
      flaws: [],
      morality: {
        path: 'Path of Metamorphosis',
        meritPoints: 2,
        startingDots: 4
      }
    }
  };

  deepFreeze(state);

  const result = getMerits(state);

  expect(result).toEqual({
    selected: state.character.merits,
    currentPoints: 6,
    availablePoints: 1
  });
});
