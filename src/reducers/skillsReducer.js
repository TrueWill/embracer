import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { standardTraitMaxDots } from '../constants/characterOptions';
import { setDotsFromStartingDots } from '../utils/categoryStarter';
import {
  addPurchasedDot,
  removePurchasedDot
} from '../utils/categoryPurchaser';

export default (state = initialState.character.skills, action) => {
  let category, trait, startingDots;

  switch (action.type) {
    case types.SET_STARTING_DOTS:
      ({ category, trait, startingDots } = action.payload);

      if (category !== 'skills') {
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

      if (category !== 'skills') {
        return state;
      }

      return addPurchasedDot(state, trait, standardTraitMaxDots);
    case types.UNPURCHASE_DOT:
      ({ category, trait } = action.payload);

      if (category !== 'skills') {
        return state;
      }

      return removePurchasedDot(state, trait);
    default:
      return state;
  }
};
