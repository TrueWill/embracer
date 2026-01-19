import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { standardTraitMaxDots } from '../constants/characterOptions';
import { setDotsFromStartingDots } from '../utils/categoryStarter';
import {
  addPurchasedDot,
  removePurchasedDot
} from '../utils/categoryPurchaser';
import type { SkillsState, CharacterAction } from '../types';

const isSkills = (category: string): boolean => category === 'skills';

const skillsReducer = (
  state: SkillsState = initialState.character.skills,
  action: CharacterAction
): SkillsState => {
  let category: string, trait: string, startingDots: number;

  switch (action.type) {
    case types.SET_STARTING_DOTS:
      ({ category, trait, startingDots } = action.payload);

      if (!isSkills(category)) {
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

      if (!isSkills(category)) {
        return state;
      }

      return addPurchasedDot(state, trait, standardTraitMaxDots);
    case types.UNPURCHASE_DOT:
      ({ category, trait } = action.payload);

      if (!isSkills(category)) {
        return state;
      }

      return removePurchasedDot(state, trait);
    default:
      return state;
  }
};

export default skillsReducer;
