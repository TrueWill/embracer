import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {
  humanity,
  moralityStartingDotsHumanity,
  moralityStartingDotsPath
} from '../constants/characterOptions';
import { removeProperty } from '../utils/objectUtils';
import type { MoralityState, CharacterAction } from '../types';

const moralityReducer = (
  state: MoralityState = initialState.character.morality,
  action: CharacterAction
): MoralityState => {
  switch (action.type) {
    case types.PURCHASE_MORALITY_DOT:
      if ((state as any).dotsPurchased || state.path !== humanity) {
        return state;
      }

      return {
        ...state,
        dotsPurchased: 1
      };
    case types.UNPURCHASE_MORALITY_DOT:
      if (!(state as any).dotsPurchased) {
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
    case types.UPDATE_CLAN:
      // reset due to clan affinities with paths
      return initialState.character.morality;
    default:
      return state;
  }
};

export default moralityReducer;
