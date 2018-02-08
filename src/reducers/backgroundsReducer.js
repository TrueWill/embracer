import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { standardTraitMaxDots } from '../constants/characterOptions';
import { setDotsFromStartingDots } from '../utils/categoryStarter';
import { addPurchasedDot } from '../utils/categoryPurchaser';

export default (state = initialState.character.backgrounds, action) => {
  let category, trait, startingDots;

  switch (action.type) {
    case types.SET_STARTING_DOTS:
      ({ category, trait, startingDots } = action.payload);

      if (category !== 'backgrounds') {
        return state;
      }

      return setDotsFromStartingDots(
        state,
        trait,
        startingDots,
        standardTraitMaxDots
      );
    case types.PURCHASE_DOT:
      ({ category, trait } = action.payload);

      if (category !== 'backgrounds') {
        return state;
      }

      return addPurchasedDot(state, trait, standardTraitMaxDots);
    default:
      return state;
  }
};
