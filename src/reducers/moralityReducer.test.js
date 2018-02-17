import deepFreeze from 'deep-freeze';
import * as actions from '../actions/characterCreationActions';
import initialState from './initialState';
import reducer from './moralityReducer';

deepFreeze(initialState.character.morality);

it('should initialize', () => {
  const action = { type: '@@INIT' };

  const nextState = reducer(undefined, action);

  expect(nextState).toBe(initialState.character.morality);
});

it('should add purchased dot when on Humanity', () => {
  const state = {
    path: 'Humanity',
    startingDots: 5
  };

  deepFreeze(state);

  const action = actions.purchaseMoralityDot();

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    path: 'Humanity',
    startingDots: 5,
    dotsPurchased: 1
  });
});

it('should do nothing if attempt to purchase subsequent dot', () => {
  const state = {
    path: 'Humanity',
    startingDots: 5,
    dotsPurchased: 1
  };

  deepFreeze(state);

  const action = actions.purchaseMoralityDot();

  const nextState = reducer(state, action);

  expect(nextState).toBe(state);
});

it('should remove purchased dot', () => {
  const state = {
    path: 'Humanity',
    startingDots: 5,
    dotsPurchased: 1
  };

  deepFreeze(state);

  const action = actions.unpurchaseMoralityDot();

  const nextState = reducer(state, action);

  expect(nextState).toEqual({
    path: 'Humanity',
    startingDots: 5
  });
});


it('should do nothing if attempt to remove dot and none purchased', () => {
  const state = {
    path: 'Humanity',
    startingDots: 5
  };

  deepFreeze(state);

  const action = actions.unpurchaseMoralityDot();

  const nextState = reducer(state, action);

  expect(nextState).toBe(state);
});
