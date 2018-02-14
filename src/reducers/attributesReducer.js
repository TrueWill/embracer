import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { attributeMaxDots } from '../constants/characterOptions';
import { setDotsFromRank } from '../utils/categoryRanker';
import {
  addPurchasedDot,
  removePurchasedDot
} from '../utils/categoryPurchaser';

const isAttributes = category => category === 'attributes';

export default (state = initialState.character.attributes, action) => {
  let category, trait, dotsFromRank;

  switch (action.type) {
    case types.SET_RANK:
      ({ category, trait, dotsFromRank } = action.payload);

      if (!isAttributes(category)) {
        return state;
      }

      return setDotsFromRank(state, trait, dotsFromRank, attributeMaxDots);
    case types.SET_FOCUS:
      const { attribute, focus } = action.payload;

      return { ...state, [attribute]: { ...state[attribute], focus: focus } };
    case types.PURCHASE_DOT:
      ({ category, trait } = action.payload);

      if (!isAttributes(category)) {
        return state;
      }

      return addPurchasedDot(state, trait, attributeMaxDots);
    case types.UNPURCHASE_DOT:
      ({ category, trait } = action.payload);

      if (!isAttributes(category)) {
        return state;
      }

      return removePurchasedDot(state, trait, true);
    default:
      return state;
  }
};
