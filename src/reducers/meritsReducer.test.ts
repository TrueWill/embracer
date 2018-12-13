import deepFreeze from 'deep-freeze';
import * as actions from '../actions/characterCreationActions';
import { updateSetting } from '../actions/settingActions';
import initialState from './initialState';
import reducer from './meritsReducer';

deepFreeze(initialState.character.merits);

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const nextState = reducer(undefined, action);

  expect(nextState).toBe(initialState.character.merits);
});

it('should add merit, preserving existing', () => {
  const state = [
    {
      name: 'Calm Heart',
      points: 1
    }
  ];

  deepFreeze(state);

  const action = actions.addMerit('Clear Sighted', 3);

  const nextState = reducer(state, action);

  expect(nextState).toEqual([
    {
      name: 'Calm Heart',
      points: 1
    },
    {
      name: 'Clear Sighted',
      points: 3
    }
  ]);
});

it('should add second merit when purchased multiple times', () => {
  const state = [
    {
      name: 'Calm Heart',
      points: 1
    },
    {
      name: 'Skill Aptitude',
      points: 2
    }
  ];

  deepFreeze(state);

  const action = actions.addMerit('Skill Aptitude', 2);

  const nextState = reducer(state, action);

  expect(nextState).toEqual([
    {
      name: 'Calm Heart',
      points: 1
    },
    {
      name: 'Skill Aptitude',
      points: 2,
      timesPurchased: 2
    }
  ]);
});

it('should add third merit when purchased multiple times', () => {
  const state = [
    {
      name: 'Calm Heart',
      points: 1
    },
    {
      name: 'Skill Aptitude',
      points: 2,
      timesPurchased: 2
    }
  ];

  deepFreeze(state);

  const action = actions.addMerit('Skill Aptitude', 2);

  const nextState = reducer(state, action);

  expect(nextState).toEqual([
    {
      name: 'Calm Heart',
      points: 1
    },
    {
      name: 'Skill Aptitude',
      points: 2,
      timesPurchased: 3
    }
  ]);
});

it('should remove merit', () => {
  const state = [
    {
      name: 'Calm Heart',
      points: 1
    },
    {
      name: 'Clear Sighted',
      points: 3
    }
  ];

  deepFreeze(state);

  const action = actions.removeMerit('Calm Heart');

  const nextState = reducer(state, action);

  expect(nextState).toEqual([
    {
      name: 'Clear Sighted',
      points: 3
    }
  ]);
});

it('should remove second merit when purchased multiple times', () => {
  const state = [
    {
      name: 'Calm Heart',
      points: 1
    },
    {
      name: 'Skill Aptitude',
      points: 2,
      timesPurchased: 2
    }
  ];

  deepFreeze(state);

  const action = actions.removeMerit('Skill Aptitude');

  const nextState = reducer(state, action);

  expect(nextState).toEqual([
    {
      name: 'Calm Heart',
      points: 1
    },
    {
      name: 'Skill Aptitude',
      points: 2
    }
  ]);
});

it('should remove third merit when purchased multiple times', () => {
  const state = [
    {
      name: 'Calm Heart',
      points: 1
    },
    {
      name: 'Skill Aptitude',
      points: 2,
      timesPurchased: 3
    }
  ];

  deepFreeze(state);

  const action = actions.removeMerit('Skill Aptitude');

  const nextState = reducer(state, action);

  expect(nextState).toEqual([
    {
      name: 'Calm Heart',
      points: 1
    },
    {
      name: 'Skill Aptitude',
      points: 2,
      timesPurchased: 2
    }
  ]);
});

it('should clear if change clan', () => {
  const state = [
    {
      name: 'Calm Heart',
      points: 1
    },
    {
      name: 'Clear Sighted',
      points: 3
    }
  ];

  deepFreeze(state);

  const action = actions.updateClan('Tremere');

  const nextState = reducer(state, action);

  expect(nextState).toEqual([]);
});

it('should clear if change setting', () => {
  const state = [
    {
      name: 'Calm Heart',
      points: 1
    },
    {
      name: 'Clear Sighted',
      points: 3
    }
  ];

  deepFreeze(state);

  const action = updateSetting('Sabbat');

  const nextState = reducer(state, action);

  expect(nextState).toEqual([]);
});
