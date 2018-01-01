import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.character.skills, action) => {
  switch (action.type) {
    case types.SET_STARTING_DOTS:
      const { category, trait, startingDots } = action.payload;

      if (category !== 'skills') {
        return state;
      }

      const matchingTrait = state[trait];

      const previousStartingDots = matchingTrait && matchingTrait.startingDots;

      const availableStartingDots = state.availableStartingDots.map(
        a =>
          a.dots === startingDots
            ? { ...a, count: a.count - 1 }
            : a.dots === previousStartingDots ? { ...a, count: a.count + 1 } : a
      );

      return {
        ...state,
        availableStartingDots,
        [trait]: { ...matchingTrait, startingDots }
      };
    default:
      return state;
  }
};
