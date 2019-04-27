import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { standardTraitMaxDots } from '../constants/characterOptions';
import { outOfClanDisciplineLevelLimit } from '../constants/clanOptions';
import { setDotsFromStartingDots } from '../utils/categoryStarter';
import {
  addPurchasedDot,
  removePurchasedDot
} from '../utils/categoryPurchaser';
import { getRitualInfoForDiscipline } from '../utils/ritualUtils';

const isDisciplines = category => category.lastIndexOf('disciplines.', 0) === 0;

const getAffinity = category => category.slice('disciplines.'.length);

const getMaxDots = affinity =>
  affinity === 'outOfClan'
    ? outOfClanDisciplineLevelLimit
    : standardTraitMaxDots;

const clearRitualTypeIfMagic = (trait, state) => {
  const ritualInfo = getRitualInfoForDiscipline(trait);

  if (
    ritualInfo.hasRituals &&
    state.rituals[ritualInfo.ritualType].length > 0
  ) {
    return {
      ...state,
      rituals: {
        ...state.rituals,
        [ritualInfo.ritualType]: []
      }
    };
  }

  return state;
};

export default (state = initialState.character.disciplines, action) => {
  let category, trait, startingDots, affinity, maxDots, newState;

  switch (action.type) {
    case types.SET_STARTING_DOTS:
      ({ category, trait, startingDots } = action.payload);

      if (!isDisciplines(category)) {
        return state;
      }

      affinity = getAffinity(category);
      maxDots = getMaxDots(affinity);

      newState = {
        ...state,
        [affinity]: setDotsFromStartingDots(
          state[affinity],
          trait,
          startingDots,
          maxDots
        )
      };

      // Currently clearing ritual type even if increasing starting dots.
      return clearRitualTypeIfMagic(trait, newState);
    case types.PURCHASE_DOT:
      ({ category, trait } = action.payload);

      if (!isDisciplines(category)) {
        return state;
      }

      affinity = getAffinity(category);
      maxDots = getMaxDots(affinity);

      return {
        ...state,
        [affinity]: addPurchasedDot(state[affinity], trait, maxDots)
      };
    case types.UNPURCHASE_DOT:
      ({ category, trait } = action.payload);

      if (!isDisciplines(category)) {
        return state;
      }

      affinity = getAffinity(category);

      newState = {
        ...state,
        [affinity]: removePurchasedDot(state[affinity], trait)
      };

      return clearRitualTypeIfMagic(trait, newState);
    case types.UPDATE_RITUALS:
      const { ritualType, rituals } = action.payload;

      return {
        ...state,
        rituals: {
          ...state.rituals,
          [ritualType]: rituals
        }
      };
    case types.UPDATE_CLAN:
      // reset
      return initialState.character.disciplines;
    default:
      return state;
  }
};
