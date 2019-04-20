import deepFreeze from 'deep-freeze';
import * as actions from '../actions/characterCreationActions';
import initialState from './initialState';
import reducer from './disciplinesReducer';

deepFreeze(initialState.character.disciplines);

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const nextState = reducer(undefined, action);

  expect(nextState).toBe(initialState.character.disciplines);
});

it('should set starting dots', () => {
  const state = {
    inClan: {
      availableStartingDots: [{ dots: 2, count: 1 }, { dots: 1, count: 2 }]
    },
    outOfClan: {
      availableStartingDots: []
    },
    rituals: {
      necromantic: [],
      thaumaturgic: []
    }
  };

  deepFreeze(state);

  const action = actions.setStartingDots('disciplines.inClan', 'Celerity', 2);

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    inClan: {
      availableStartingDots: [{ dots: 2, count: 0 }, { dots: 1, count: 2 }],
      Celerity: {
        startingDots: 2
      }
    },
    outOfClan: {
      availableStartingDots: []
    },
    rituals: {
      necromantic: [],
      thaumaturgic: []
    }
  });
});

it('should add subsequent purchased dot in-clan', () => {
  const state = {
    inClan: {
      availableStartingDots: [{ dots: 2, count: 0 }, { dots: 1, count: 2 }],
      Celerity: {
        startingDots: 2,
        dotsPurchased: 2
      }
    },
    outOfClan: {
      availableStartingDots: [],
      Potence: {
        dotsPurchased: 1
      }
    },
    rituals: {
      necromantic: [],
      thaumaturgic: []
    }
  };

  deepFreeze(state);

  const action = actions.purchaseDot('disciplines.inClan', 'Celerity');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    inClan: {
      availableStartingDots: [{ dots: 2, count: 0 }, { dots: 1, count: 2 }],
      Celerity: {
        startingDots: 2,
        dotsPurchased: 3
      }
    },
    outOfClan: {
      availableStartingDots: [],
      Potence: {
        dotsPurchased: 1
      }
    },
    rituals: {
      necromantic: [],
      thaumaturgic: []
    }
  });
});

it('should add subsequent purchased dot out-of-clan', () => {
  const state = {
    inClan: {
      availableStartingDots: [{ dots: 2, count: 0 }, { dots: 1, count: 2 }],
      Celerity: {
        startingDots: 2,
        dotsPurchased: 2
      }
    },
    outOfClan: {
      availableStartingDots: [],
      Potence: {
        dotsPurchased: 1
      },
      Presence: {
        dotsPurchased: 1
      }
    },
    rituals: {
      necromantic: [],
      thaumaturgic: []
    }
  };

  deepFreeze(state);

  const action = actions.purchaseDot('disciplines.outOfClan', 'Potence');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    inClan: {
      availableStartingDots: [{ dots: 2, count: 0 }, { dots: 1, count: 2 }],
      Celerity: {
        startingDots: 2,
        dotsPurchased: 2
      }
    },
    outOfClan: {
      availableStartingDots: [],
      Potence: {
        dotsPurchased: 2
      },
      Presence: {
        dotsPurchased: 1
      }
    },
    rituals: {
      necromantic: [],
      thaumaturgic: []
    }
  });
});

it('should clear if change clan', () => {
  const state = {
    inClan: {
      availableStartingDots: [{ dots: 2, count: 0 }, { dots: 1, count: 2 }],
      Celerity: {
        startingDots: 2,
        dotsPurchased: 2
      }
    },
    outOfClan: {
      availableStartingDots: [],
      Potence: {
        dotsPurchased: 1
      }
    },
    rituals: {
      necromantic: [1],
      thaumaturgic: [1]
    }
  };

  deepFreeze(state);

  const action = actions.updateClan('Tremere');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    inClan: {
      availableStartingDots: [{ dots: 2, count: 1 }, { dots: 1, count: 2 }]
    },
    outOfClan: {
      availableStartingDots: []
    },
    rituals: {
      necromantic: [],
      thaumaturgic: []
    }
  });
});

it('should remove initial purchased dot and discipline if no other properties', () => {
  const state = {
    inClan: {
      availableStartingDots: [{ dots: 2, count: 1 }, { dots: 1, count: 2 }],
      Celerity: {
        dotsPurchased: 1
      }
    },
    outOfClan: {
      availableStartingDots: []
    },
    rituals: {
      necromantic: [],
      thaumaturgic: []
    }
  };

  deepFreeze(state);

  const action = actions.unpurchaseDot('disciplines.inClan', 'Celerity');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    inClan: {
      availableStartingDots: [{ dots: 2, count: 1 }, { dots: 1, count: 2 }]
    },
    outOfClan: {
      availableStartingDots: []
    },
    rituals: {
      necromantic: [],
      thaumaturgic: []
    }
  });
});

it('should reduce purchased dots exceeding max when set starting dots', () => {
  const state = {
    inClan: {
      availableStartingDots: [{ dots: 2, count: 1 }, { dots: 1, count: 2 }],
      Celerity: {
        dotsPurchased: 4
      }
    },
    outOfClan: {
      availableStartingDots: []
    },
    rituals: {
      necromantic: [],
      thaumaturgic: []
    }
  };

  deepFreeze(state);

  const action = actions.setStartingDots('disciplines.inClan', 'Celerity', 2);

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    inClan: {
      availableStartingDots: [{ dots: 2, count: 0 }, { dots: 1, count: 2 }],
      Celerity: {
        startingDots: 2,
        dotsPurchased: 3
      }
    },
    outOfClan: {
      availableStartingDots: []
    },
    rituals: {
      necromantic: [],
      thaumaturgic: []
    }
  });
});

it('should do nothing if purchased dot would exceed max in-clan', () => {
  const state = {
    inClan: {
      availableStartingDots: [{ dots: 2, count: 0 }, { dots: 1, count: 2 }],
      Celerity: {
        startingDots: 2,
        dotsPurchased: 3
      }
    },
    outOfClan: {
      availableStartingDots: []
    },
    rituals: {
      necromantic: [],
      thaumaturgic: []
    }
  };

  deepFreeze(state);

  const action = actions.purchaseDot('disciplines.inClan', 'Celerity');

  const nextState = reducer(state, action);

  expect(nextState).toEqual(state);
});

it('should do nothing if purchased dot would exceed max out-of-clan', () => {
  const state = {
    inClan: {
      availableStartingDots: [{ dots: 2, count: 1 }, { dots: 1, count: 2 }]
    },
    outOfClan: {
      availableStartingDots: [],
      Potence: {
        dotsPurchased: 3
      }
    },
    rituals: {
      necromantic: [],
      thaumaturgic: []
    }
  };

  deepFreeze(state);

  const action = actions.purchaseDot('disciplines.outOfClan', 'Potence');

  const nextState = reducer(state, action);

  expect(nextState).toEqual(state);
});

it('should do nothing when purchased dot category does not match', () => {
  const state = {
    inClan: {
      availableStartingDots: [{ dots: 2, count: 1 }, { dots: 1, count: 2 }]
    },
    outOfClan: {
      availableStartingDots: []
    },
    rituals: {
      necromantic: [],
      thaumaturgic: []
    }
  };

  deepFreeze(state);

  const action = actions.purchaseDot('skills', 'computer');

  const nextState = reducer(state, action);

  expect(nextState).toBe(state);
});
