import initialState from './initialState';
import * as types from '../constants/actionTypes';
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
    default:
      return state;
  }
};
