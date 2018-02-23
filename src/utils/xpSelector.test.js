import deepFreeze from 'deep-freeze';
import initialState from '../reducers/initialState';
import xpSelector from './xpSelector';

deepFreeze(initialState);

it('should return correct initial values', () => {
  const result = xpSelector(initialState);

  expect(result).toEqual({
    spent: 0,
    gainedFromFlaws: 0,
    available: 30,
    bankable: 5
  });
});

it('should calculate values', () => {
  const state = {
    character: {
      basicInfo: {
        archetype: '',
        clan: 'Brujah'
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
          Dominate: {
            dotsPurchased: 2
          }
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
  };

  deepFreeze(state);

  const result = xpSelector(state);

  expect(result).toEqual({
    spent: 112, // 6+3 + 10+8+10+6+2 + 8+10+4+2+4 + 9+6+9 + 4+8 + 2+1
    gainedFromFlaws: 7,
    available: -75,
    bankable: 0
  });
});

it('should calculate generation costs', () => {
  const state = {
    character: {
      basicInfo: {
        archetype: '',
        clan: ''
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
        outOfClan: {}
      },
      merits: [],
      flaws: [],
      morality: {
        path: 'Humanity',
        startingDots: 5
      }
    }
  };

  deepFreeze(state);

  const result = xpSelector(state);

  expect(result).toEqual({
    spent: 10,
    gainedFromFlaws: 0,
    available: 20,
    bankable: 5
  });
});

it('should calculate morality costs', () => {
  const state = {
    character: {
      basicInfo: {
        archetype: '',
        clan: ''
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
        outOfClan: {}
      },
      merits: [],
      flaws: [],
      morality: {
        path: 'Humanity',
        startingDots: 5,
        dotsPurchased: 1
      }
    }
  };

  deepFreeze(state);

  const result = xpSelector(state);

  expect(result).toEqual({
    spent: 10,
    gainedFromFlaws: 0,
    available: 20,
    bankable: 5
  });
});

it('should calculate bankable when available is less', () => {
  const state = {
    mode: {
      isEraser: false
    },
    character: {
      basicInfo: {
        archetype: '',
        clan: ''
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
        }
      },
      merits: [],
      flaws: [],
      morality: {
        path: 'Humanity',
        startingDots: 5
      }
    }
  };

  deepFreeze(state);

  const result = xpSelector(state);

  expect(result).toEqual({
    spent: 27,
    gainedFromFlaws: 0,
    available: 3,
    bankable: 3
  });
});
