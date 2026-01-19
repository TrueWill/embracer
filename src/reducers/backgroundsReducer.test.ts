import deepFreeze from 'deep-freeze';
import * as actions from '../actions/characterCreationActions';
import { updateSetting } from '../actions/settingActions';
import initialState from './initialState';
import reducer from './backgroundsReducer';

deepFreeze(initialState.character.backgrounds);

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const nextState = reducer(undefined, action);

  expect(nextState).toBe(initialState.character.backgrounds);
});

it('should set starting dots', () => {
  const state = {
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
  };

  deepFreeze(state);

  const action = actions.setStartingDots('backgrounds', 'fame', 3);

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    availableStartingDots: [
      {
        dots: 3,
        count: 0
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
    },
    fame: {
      startingDots: 3
    }
  });
});

it('should do nothing when category does not match', () => {
  const state = {
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
  };

  deepFreeze(state);

  const action = actions.setStartingDots('skills', 'computer', 3);

  const nextState = reducer(state, action);

  expect(nextState).toBe(state);
});

it('should add purchased dot', () => {
  const state = {
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
  };

  deepFreeze(state);

  const action = actions.purchaseDot('backgrounds', 'allies');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
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
    },
    allies: {
      dotsPurchased: 1
    }
  });
});

it('should remove initial purchased dot and background if no other properties', () => {
  const state = {
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
    },
    allies: {
      dotsPurchased: 1
    }
  };

  deepFreeze(state);

  const action = actions.unpurchaseDot('backgrounds', 'allies');

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
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
  });
});

it('should clear if change clan to Caitiff', () => {
  const state = {
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
    generation: {
      startingDots: 3,
      dotsPurchased: 2
    },
    fame: {
      startingDots: 2,
      dotsPurchased: 1
    },
    haven: {
      startingDots: 1,
      dotsPurchased: 1
    }
  };

  deepFreeze(state);

  const action = actions.updateClan('Caitiff');

  const nextState = reducer(state, action);

  expect(nextState).toBe(initialState.character.backgrounds);
});

it('should not clear Generation if change clan to Brujah', () => {
  const state = {
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
    generation: {
      startingDots: 3,
      dotsPurchased: 2
    },
    fame: {
      startingDots: 2,
      dotsPurchased: 1
    },
    haven: {
      startingDots: 1,
      dotsPurchased: 1
    }
  };

  deepFreeze(state);

  const action = actions.updateClan('Brujah');

  const nextState = reducer(state, action);

  expect(nextState).toBe(state);
});

it('should clear if change setting', () => {
  const state = {
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
    generation: {
      startingDots: 3,
      dotsPurchased: 2
    },
    fame: {
      startingDots: 2,
      dotsPurchased: 1
    },
    rituals: {
      startingDots: 1,
      dotsPurchased: 1
    }
  };

  deepFreeze(state);

  const action = updateSetting('Camarilla');

  const nextState = reducer(state, action);

  expect(nextState).toBe(initialState.character.backgrounds);
});
