import deepFreeze from 'deep-freeze';
import getRituals from './getRituals';

it('should return correct initial values', () => {
  const state = {
    character: {
      disciplines: {
        inClan: {
          availableStartingDots: [
            {
              dots: 2,
              count: 1
            },
            {
              dots: 1,
              count: 2
            }
          ]
        },
        outOfClan: {
          availableStartingDots: []
        },
        rituals: {
          necromantic: [],
          thaumaturgic: []
        }
      }
    }
  };

  deepFreeze(state);

  const result = getRituals(state);

  expect(result).toEqual({
    necromantic: {
      isAvailable: false,
      displayName: 'Necromantic',
      permutations: [],
      selected: []
    },
    thaumaturgic: {
      isAvailable: false,
      displayName: 'Thaumaturgic',
      permutations: [],
      selected: []
    }
  });
});

it('should return correct values when no magic', () => {
  const state = {
    character: {
      disciplines: {
        inClan: {
          availableStartingDots: [
            {
              dots: 2,
              count: 0
            },
            {
              dots: 1,
              count: 2
            }
          ],
          Celerity: {
            startingDots: 2
          }
        },
        outOfClan: {
          availableStartingDots: [],
          Auspex: {
            dotsPurchased: 1
          }
        },
        rituals: {
          necromantic: [],
          thaumaturgic: []
        }
      }
    }
  };

  deepFreeze(state);

  const result = getRituals(state);

  expect(result).toEqual({
    necromantic: {
      isAvailable: false,
      displayName: 'Necromantic',
      permutations: [],
      selected: []
    },
    thaumaturgic: {
      isAvailable: false,
      displayName: 'Thaumaturgic',
      permutations: [],
      selected: []
    }
  });
});

it('should return correct values when has Thaumaturgy', () => {
  const state = {
    character: {
      disciplines: {
        inClan: {
          availableStartingDots: [
            {
              dots: 2,
              count: 0
            },
            {
              dots: 1,
              count: 2
            }
          ],
          'Thaumaturgy: Path of Blood': {
            startingDots: 2,
            dotsPurchased: 1
          }
        },
        outOfClan: {
          availableStartingDots: []
        },
        rituals: {
          necromantic: [],
          thaumaturgic: [1]
        }
      }
    }
  };

  deepFreeze(state);

  const result = getRituals(state);

  expect(result).toEqual({
    necromantic: {
      isAvailable: false,
      displayName: 'Necromantic',
      permutations: [],
      selected: []
    },
    thaumaturgic: {
      isAvailable: true,
      displayName: 'Thaumaturgic',
      permutations: [
        { description: '(none)', value: [] },
        { description: '1 Level One', value: [1] },
        { description: '2 Level Ones', value: [2] },
        { description: '3 Level Ones', value: [3] },
        { description: '1 Level One, 1 Level Two', value: [1, 1] },
        { description: '2 Level Ones, 1 Level Two', value: [2, 1] },
        { description: '1 Level One, 2 Level Twos', value: [1, 2] },
        {
          description: '1 Level One, 1 Level Two, 1 Level Three',
          value: [1, 1, 1]
        }
      ],
      selected: [1]
    }
  });
});

it('should return correct values when has Necromancy', () => {
  const state = {
    character: {
      disciplines: {
        inClan: {
          availableStartingDots: [
            {
              dots: 2,
              count: 0
            },
            {
              dots: 1,
              count: 2
            }
          ],
          'Necromancy: Sepulchre Path': {
            startingDots: 2
          }
        },
        outOfClan: {
          availableStartingDots: []
        },
        rituals: {
          necromantic: [2],
          thaumaturgic: []
        }
      }
    }
  };

  deepFreeze(state);

  const result = getRituals(state);

  expect(result).toEqual({
    necromantic: {
      isAvailable: true,
      displayName: 'Necromantic',
      permutations: [
        { description: '(none)', value: [] },
        { description: '1 Level One', value: [1] },
        { description: '2 Level Ones', value: [2] },
        { description: '1 Level One, 1 Level Two', value: [1, 1] }
      ],
      selected: [2]
    },
    thaumaturgic: {
      isAvailable: false,
      displayName: 'Thaumaturgic',
      permutations: [],
      selected: []
    }
  });
});

it('should return correct values when has both', () => {
  const state = {
    character: {
      disciplines: {
        inClan: {
          availableStartingDots: [
            {
              dots: 2,
              count: 0
            },
            {
              dots: 1,
              count: 2
            }
          ],
          'Necromancy: Sepulchre Path': {
            startingDots: 2
          },
          Dominate: {
            dotsPurchased: 1
          }
        },
        outOfClan: {
          availableStartingDots: [],
          'Thaumaturgy: Path of Blood': {
            dotsPurchased: 1
          }
        },
        rituals: {
          necromantic: [2],
          thaumaturgic: [1]
        }
      }
    }
  };

  deepFreeze(state);

  const result = getRituals(state);

  expect(result).toEqual({
    necromantic: {
      isAvailable: true,
      displayName: 'Necromantic',
      permutations: [
        { description: '(none)', value: [] },
        { description: '1 Level One', value: [1] },
        { description: '2 Level Ones', value: [2] },
        { description: '1 Level One, 1 Level Two', value: [1, 1] }
      ],
      selected: [2]
    },
    thaumaturgic: {
      isAvailable: true,
      displayName: 'Thaumaturgic',
      permutations: [
        { description: '(none)', value: [] },
        { description: '1 Level One', value: [1] }
      ],
      selected: [1]
    }
  });
});

it('should return correct values when multiple paths', () => {
  const state = {
    character: {
      disciplines: {
        inClan: {
          availableStartingDots: [
            {
              dots: 2,
              count: 0
            },
            {
              dots: 1,
              count: 2
            }
          ],
          'Thaumaturgy: Path of Blood': {
            startingDots: 2
          }
        },
        outOfClan: {
          availableStartingDots: [],
          'Thaumaturgy: Path of Elemental Mastery': {
            dotsPurchased: 1
          }
        },
        rituals: {
          necromantic: [],
          thaumaturgic: [1]
        }
      }
    }
  };

  deepFreeze(state);

  const result = getRituals(state);

  expect(result).toEqual({
    necromantic: {
      isAvailable: false,
      displayName: 'Necromantic',
      permutations: [],
      selected: []
    },
    thaumaturgic: {
      isAvailable: true,
      displayName: 'Thaumaturgic',
      permutations: [
        { description: '(none)', value: [] },
        { description: '1 Level One', value: [1] },
        { description: '2 Level Ones', value: [2] },
        { description: '3 Level Ones', value: [3] },
        { description: '1 Level One, 1 Level Two', value: [1, 1] },
        { description: '2 Level Ones, 1 Level Two', value: [2, 1] },
        { description: '1 Level One, 2 Level Twos', value: [1, 2] }
      ],
      selected: [1]
    }
  });
});
