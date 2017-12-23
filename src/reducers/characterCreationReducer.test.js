import deepFreeze from 'deep-freeze';
import * as actions from '../actions/characterCreationActions';
import initialState from './initialState';
import characterCreation from './characterCreationReducer';

deepFreeze(initialState.character);

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const nextState = characterCreation(undefined, action);

  expect(nextState).toBe(initialState.character);
});

it('should update archetype', () => {
  const state = {
    archetype: 'old',
    clan: 'aclan'
  };

  deepFreeze(state);

  const action = actions.updateArchetype('new');

  const nextState = characterCreation(state, action);

  expect(nextState).toEqual({
    archetype: 'new',
    clan: 'aclan'
  });
});

it('should update clan', () => {
  const state = {
    archetype: 'arc',
    clan: 'old'
  };

  deepFreeze(state);

  const action = actions.updateClan('new');

  const nextState = characterCreation(state, action);

  expect(nextState).toEqual({
    archetype: 'arc',
    clan: 'new'
  });
});

it('should set initial rank', () => {
  const state = {
    attributes: {
      physical: {
        dots: 0
      },
      social: {
        dots: 0
      },
      mental: {
        dots: 0
      }
    }
  };

  deepFreeze(state);

  const action = actions.setRank('attributes', 'mental', 1, 7);

  const nextState = characterCreation(state, action);

  expect(nextState).toEqual({
    attributes: {
      physical: {
        dots: 0
      },
      social: {
        dots: 0
      },
      mental: {
        dots: 7,
        rank: 1
      }
    }
  });
});

it('should update rank', () => {
  const state = {
    attributes: {
      physical: {
        dots: 7,
        rank: 1
      },
      social: {
        dots: 3,
        rank: 3
      },
      mental: {
        dots: 5,
        rank: 2
      }
    }
  };

  deepFreeze(state);

  const action = actions.setRank('attributes', 'mental', 1, 7);

  const nextState = characterCreation(state, action);

  expect(nextState).toEqual({
    attributes: {
      physical: {
        dots: 0
      },
      social: {
        dots: 3,
        rank: 3
      },
      mental: {
        dots: 7,
        rank: 1
      }
    }
  });
});
