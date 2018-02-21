import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {
  humanity,
  moralityStartingDotsHumanity,
  moralityStartingDotsPath
} from '../constants/characterOptions';
import { removeProperty } from '../utils/objectUtils';

export default (state = initialState.character.morality, action) => {
  switch (action.type) {
    case types.PURCHASE_MORALITY_DOT:
      if (state.dotsPurchased) {
        return state;
      }

      return {
        ...state,
        dotsPurchased: 1
      };
    case types.UNPURCHASE_MORALITY_DOT:
      if (!state.dotsPurchased) {
        return state;
      }

      return removeProperty(state, 'dotsPurchased');
    case types.UPDATE_MORALITY:
      const { path, meritPoints } = action.payload;

      if (state.path === path) {
        return state;
      }

      return path === humanity
        ? { path: humanity, startingDots: moralityStartingDotsHumanity }
        : { path, meritPoints, startingDots: moralityStartingDotsPath };
    default:
      return state;
  }
};
