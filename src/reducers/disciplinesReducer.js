import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { setDotsFromStartingDots } from '../utils/categoryStarter';
import { addPurchasedDot } from '../utils/categoryPurchaser';

export default (state = initialState.character.disciplines, action) => {
  let category, trait, startingDots, affinity;

  switch (action.type) {
    case types.SET_STARTING_DOTS:
      ({ category, trait, startingDots } = action.payload);

      if (category.lastIndexOf('disciplines.', 0) !== 0) {
        return state;
      }

      affinity = category.slice('disciplines.'.length);

      return {
        ...state,
        [affinity]: setDotsFromStartingDots(
          state[affinity],
          trait,
          startingDots
        )
      };
    case types.PURCHASE_DOT:
      ({ category, trait } = action.payload);

      // TODO: Refactor to remove duplication
      if (category.lastIndexOf('disciplines.', 0) !== 0) {
        return state;
      }

      affinity = category.slice('disciplines.'.length);

      return {
        ...state,
        [affinity]: addPurchasedDot(state[affinity], trait)
      };
    case types.UPDATE_CLAN:
      // reset
      return initialState.character.disciplines;
    default:
      return state;
  }
};
