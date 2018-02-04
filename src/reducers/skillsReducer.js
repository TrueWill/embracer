import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { setDotsFromStartingDots } from '../utils/categoryStarter';

export default (state = initialState.character.skills, action) => {
  let category, trait, startingDots;

  switch (action.type) {
    case types.SET_STARTING_DOTS:
      ({ category, trait, startingDots } = action.payload);

      if (category !== 'skills') {
        return state;
      }

      return setDotsFromStartingDots(state, trait, startingDots);
    case types.PURCHASE_DOT:
      ({ category, trait } = action.payload);

      if (category !== 'skills') {
        return state;
      }

      const matchingTrait = state[trait];

      const previousDotsPurchased = matchingTrait
        ? matchingTrait.dotsPurchased || 0
        : 0;

      // It is legal to spread undefined.
      return {
        ...state,
        [trait]: { ...matchingTrait, dotsPurchased: previousDotsPurchased + 1 }
      };

    default:
      return state;
  }
};
