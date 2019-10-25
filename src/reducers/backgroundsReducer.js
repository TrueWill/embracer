import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { standardTraitMaxDots } from '../constants/characterOptions';
import { setDotsFromStartingDots } from '../utils/categoryStarter';
import {
  addPurchasedDot,
  removePurchasedDot
} from '../utils/categoryPurchaser';

const isBackgrounds = category => category === 'backgrounds';

export default (state = initialState.character.backgrounds, action) => {
  let category, trait, startingDots;

  switch (action.type) {
    case types.SET_STARTING_DOTS:
      ({ category, trait, startingDots } = action.payload);

      if (!isBackgrounds(category)) {
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

      if (!isBackgrounds(category)) {
        return state;
      }

      return addPurchasedDot(state, trait, standardTraitMaxDots);
    case types.UNPURCHASE_DOT:
      ({ category, trait } = action.payload);

      if (!isBackgrounds(category)) {
        return state;
      }

      return removePurchasedDot(state, trait);
    case types.UPDATE_SETTING:
      // reset, as there are setting-specific backgrounds
      return initialState.character.backgrounds;
    case types.UPDATE_CLAN:
      if (action.payload.name === 'Caitiff') {
        return initialState.character.backgrounds;
      }

      return state;
    default:
      return state;
  }
};
