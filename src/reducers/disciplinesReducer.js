import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { setDotsFromStartingDots } from '../utils/categoryStarter';

export default (state = initialState.character.disciplines, action) => {
  switch (action.type) {
    // TODO: If change clan, reset disciplines
    case types.SET_STARTING_DOTS:
      const { category, trait, startingDots } = action.payload;

      if (category.lastIndexOf('disciplines.', 0) !== 0) {
        return state;
      }

      const affinity = category.slice('disciplines.'.length);

      return {
        ...state,
        [affinity]: setDotsFromStartingDots(
          state[affinity],
          trait,
          startingDots
        )
      };

    default:
      return state;
  }
};
