import deepFreeze from 'deep-freeze';
import initialState from '../reducers/initialState';
import getXP from './getXP';
import { createMockRootState } from '../test-utils/mockState';

deepFreeze(initialState);

it('should return correct initial values', () => {
  const result = getXP(initialState);

  expect(result).toEqual({
    spent: 0,
    gainedFromFlaws: 0,
    available: 30,
    bankable: 5
  });
});

it('should calculate values', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        archetype: '',
        clan: { name: 'Brujah' }
      },
      attributes: {
        physical: {
          dotsFromRank: 7
        },
        social: {
          dotsFromRank: 5,
          dotsPurchased: 2
        },
        mental: {
          dotsFromRank: 3,
          dotsPurchased: 1
        }
      },
      skills: {
        availableStartingDots: [
          {
            dots: 4,
            count: 0
          },
          {
            dots: 3,
            count: 1
          },
          {
            dots: 2,
            count: 2
          },
          {
            dots: 1,
            count: 4
          }
        ],
        academics: {
          startingDots: 4,
          dotsPurchased: 1
        },
        animalKen: {
          startingDots: 3,
          dotsPurchased: 2
        },
        athletics: {
          startingDots: 2,
          dotsPurchased: 1
        },
        awareness: {
          dotsPurchased: 1
        }
      },
      backgrounds: {
        availableStartingDots: [
          {
            dots: 3,
            count: 0
          },
          {
            dots: 2,
            count: 0
          },
          {
            dots: 1,
            count: 0
          }
        ],
        alternateIdentity: {
          startingDots: 3,
          dotsPurchased: 2
        },
        fame: {
          startingDots: 1,
          dotsPurchased: 1
        },
        haven: {
          dotsPurchased: 2
        },
        generation: {
          startingDots: 2 // Ancilla
        }
      },
      disciplines: {
        inClan: {
          availableStartingDots: [
            {
              dots: 2,
              count: 0
            },
            {
              dots: 1,
              count: 0
            }
          ],
          Celerity: {
            startingDots: 2,
            dotsPurchased: 1
          },
          Potence: {
            startingDots: 1,
            dotsPurchased: 2
          },
          Presence: {
            startingDots: 1
          }
        },
        outOfClan: {
          availableStartingDots: [],
          'Necromancy: Mortis Path': {
            dotsPurchased: 2
          }
        },
        rituals: {
          necromantic: [1, 1],
          thaumaturgic: []
        }
      },
      merits: [
        {
          name: 'Burning Wrath',
          points: 2
        },
        {
          name: 'Brotherhood',
          points: 1
        }
      ],
      flaws: [
        {
          name: 'Blood Rot',
          points: 5
        },
        {
          name: 'Addiction',
          points: 2
        }
      ],
      morality: {
        path: 'Humanity',
        startingDots: 5
      }
    }
  });

  deepFreeze(state);

  const result = getXP(state);

  expect(result).toEqual({
    spent: 118, // 6+3 + 10+8+10+6+2 + 8+10+4+2+4 + 9+6+9 + 4+8 + 2+4 + 2+1
    gainedFromFlaws: 7,
    available: -81,
    bankable: 0
  });
});

it('should calculate generation costs', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        archetype: '',
        clan: { name: '' }
      },
      attributes: {
        physical: {},
        social: {},
        mental: {}
      },
      skills: {},
      backgrounds: {
        availableStartingDots: [
          {
            dots: 3,
            count: 1
          },
          {
            dots: 2,
            count: 1
          },
          {
            dots: 1,
            count: 0
          }
        ],
        generation: {
          startingDots: 1, // Neonate
          dotsPurchased: 2 // to Pretender Elder
        }
      },
      disciplines: {
        inClan: {},
        outOfClan: {},
        rituals: {
          necromantic: [],
          thaumaturgic: []
        }
      },
      merits: [],
      flaws: [],
      morality: {
        path: 'Humanity',
        startingDots: 5
      }
    }
  });

  deepFreeze(state);

  const result = getXP(state);

  expect(result).toEqual({
    spent: 10,
    gainedFromFlaws: 0,
    available: 20,
    bankable: 5
  });
});

it('should calculate morality costs', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        archetype: '',
        clan: { name: '' }
      },
      attributes: {
        physical: {},
        social: {},
        mental: {}
      },
      skills: {},
      backgrounds: {
        availableStartingDots: [
          {
            dots: 3,
            count: 1
          },
          {
            dots: 2,
            count: 1
          },
          {
            dots: 1,
            count: 0
          }
        ],
        generation: {
          startingDots: 1
        }
      },
      disciplines: {
        inClan: {},
        outOfClan: {},
        rituals: {
          necromantic: [],
          thaumaturgic: []
        }
      },
      merits: [],
      flaws: [],
      morality: {
        path: 'Humanity',
        startingDots: 5,
        dotsPurchased: 1
      }
    }
  });

  deepFreeze(state);

  const result = getXP(state);

  expect(result).toEqual({
    spent: 10,
    gainedFromFlaws: 0,
    available: 20,
    bankable: 5
  });
});

it('should calculate morality costs when True Brujah', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        archetype: '',
        clan: { name: 'Brujah', bloodline: 'True Brujah', meritPoints: 4 }
      },
      attributes: {
        physical: {},
        social: {},
        mental: {}
      },
      skills: {},
      backgrounds: {
        availableStartingDots: [
          {
            dots: 3,
            count: 1
          },
          {
            dots: 2,
            count: 1
          },
          {
            dots: 1,
            count: 0
          }
        ],
        generation: {
          startingDots: 1
        }
      },
      disciplines: {
        inClan: {},
        outOfClan: {},
        rituals: {
          necromantic: [],
          thaumaturgic: []
        }
      },
      merits: [],
      flaws: [],
      morality: {
        path: 'Humanity',
        startingDots: 5,
        dotsPurchased: 1
      }
    }
  });

  deepFreeze(state);

  const result = getXP(state);

  expect(result).toEqual({
    spent: 24,
    gainedFromFlaws: 0,
    available: 6,
    bankable: 5
  });
});

it('should calculate bankable when available is less', () => {
  const state = createMockRootState({
    mode: {
      isEraser: false
    },
    character: {
      basicInfo: {
        archetype: '',
        clan: { name: '' }
      },
      attributes: {
        physical: {
          dotsPurchased: 9
        },
        social: {},
        mental: {}
      },
      skills: {
        availableStartingDots: [
          {
            dots: 4,
            count: 1
          },
          {
            dots: 3,
            count: 2
          },
          {
            dots: 2,
            count: 3
          },
          {
            dots: 1,
            count: 4
          }
        ]
      },
      backgrounds: {
        availableStartingDots: [
          {
            dots: 3,
            count: 1
          },
          {
            dots: 2,
            count: 1
          },
          {
            dots: 1,
            count: 0
          }
        ],
        generation: {
          startingDots: 1
        }
      },
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
      },
      merits: [],
      flaws: [],
      morality: {
        path: 'Humanity',
        startingDots: 5
      }
    }
  });

  deepFreeze(state);

  const result = getXP(state);

  expect(result).toEqual({
    spent: 27,
    gainedFromFlaws: 0,
    available: 3,
    bankable: 3
  });
});

it('should calculate when merit purchased multiple times', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        archetype: '',
        clan: { name: '' }
      },
      attributes: {
        physical: {},
        social: {},
        mental: {}
      },
      skills: {},
      backgrounds: {
        availableStartingDots: [
          {
            dots: 3,
            count: 1
          },
          {
            dots: 2,
            count: 1
          },
          {
            dots: 1,
            count: 0
          }
        ],
        generation: {
          startingDots: 1
        }
      },
      disciplines: {
        inClan: {},
        outOfClan: {},
        rituals: {
          necromantic: [],
          thaumaturgic: []
        }
      },
      merits: [
        {
          name: 'Skill Aptitude',
          points: 2,
          timesPurchased: 2
        }
      ],
      flaws: [],
      morality: {
        path: 'Humanity',
        startingDots: 5
      }
    }
  });

  deepFreeze(state);

  const result = getXP(state);

  expect(result).toEqual({
    spent: 4,
    gainedFromFlaws: 0,
    available: 26,
    bankable: 5
  });
});

it('should cache', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        archetype: '',
        clan: { name: '' }
      },
      attributes: {
        physical: {},
        social: {},
        mental: {}
      },
      skills: {},
      backgrounds: {
        availableStartingDots: [
          {
            dots: 3,
            count: 1
          },
          {
            dots: 2,
            count: 1
          },
          {
            dots: 1,
            count: 0
          }
        ],
        generation: {
          startingDots: 1
        }
      },
      disciplines: {
        inClan: {},
        outOfClan: {},
        rituals: {
          necromantic: [],
          thaumaturgic: []
        }
      },
      merits: [],
      flaws: [],
      morality: {
        path: 'Humanity',
        startingDots: 5
      }
    }
  });

  const previousRecomputations = getXP.recomputations();

  getXP(state);
  getXP(state);

  expect(getXP.recomputations()).toBe(previousRecomputations + 1);
});
