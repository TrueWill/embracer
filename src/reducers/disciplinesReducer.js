import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {
  outOfClanDisciplineLevelLimit,
  standardTraitMaxDots
} from '../constants/characterOptions';
import { setDotsFromStartingDots } from '../utils/categoryStarter';
import { addPurchasedDot } from '../utils/categoryPurchaser';

export default (state = initialState.character.disciplines, action) => {
  let category, trait, startingDots, affinity, maxDots;

  switch (action.type) {
    case types.SET_STARTING_DOTS:
      ({ category, trait, startingDots } = action.payload);

      if (category.lastIndexOf('disciplines.', 0) !== 0) {
        return state;
      }

      affinity = category.slice('disciplines.'.length);

      // TODO: Add tests
      maxDots =
        affinity === 'outOfClan'
          ? outOfClanDisciplineLevelLimit
          : standardTraitMaxDots;

      return {
        ...state,
        [affinity]: setDotsFromStartingDots(
          state[affinity],
          trait,
          startingDots,
          maxDots
        )
      };
    case types.PURCHASE_DOT:
      ({ category, trait } = action.payload);

      // TODO: Refactor to remove duplication
      if (category.lastIndexOf('disciplines.', 0) !== 0) {
        return state;
      }

      affinity = category.slice('disciplines.'.length);

      // TODO: Add tests
      maxDots =
        affinity === 'outOfClan'
          ? outOfClanDisciplineLevelLimit
          : standardTraitMaxDots;

      return {
        ...state,
        [affinity]: addPurchasedDot(state[affinity], trait, maxDots)
      };
    case types.UPDATE_CLAN:
      // reset
      return initialState.character.disciplines;
    default:
      return state;
  }
};
