import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { attributeMaxDots } from '../constants/characterOptions';
import { setDotsFromRank } from '../utils/categoryRanker';
import {
  addPurchasedDot,
  removePurchasedDot
} from '../utils/categoryPurchaser';
import type { AttributesState, CharacterAction } from '../types';

const isAttributes = (category: string): boolean => category === 'attributes';

const attributesReducer = (
  state: AttributesState = initialState.character.attributes,
  action: CharacterAction
): AttributesState => {
  let category: string, trait: string, dotsFromRank: number;

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
    case types.UPDATE_CLAN:
      if (
        action.payload.name === 'Nosferatu' &&
        state.social.focus === 'Appearance'
      ) {
        return { ...state, social: { ...state.social, focus: '' } };
      }

      return state;
    default:
      return state;
  }
};

export default attributesReducer;
