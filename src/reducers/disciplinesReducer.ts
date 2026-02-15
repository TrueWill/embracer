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
import type {
  DisciplinesState,
  SetStartingDotsAction,
  PurchaseDotAction,
  UnpurchaseDotAction,
  UpdateRitualsAction,
  UpdateClanAction
} from '../types';

type DisciplinesAction =
  | SetStartingDotsAction
  | PurchaseDotAction
  | UnpurchaseDotAction
  | UpdateRitualsAction
  | UpdateClanAction;

const isDisciplines = (category: string): boolean =>
  category.lastIndexOf('disciplines.', 0) === 0;

const getAffinity = (category: string): string =>
  category.slice('disciplines.'.length);

const getMaxDots = (affinity: string): number =>
  affinity === 'outOfClan'
    ? outOfClanDisciplineLevelLimit
    : standardTraitMaxDots;

const clearRitualTypeIfMagic = (
  trait: string,
  state: DisciplinesState
): DisciplinesState => {
  const ritualInfo = getRitualInfoForDiscipline(trait);

  if (
    ritualInfo.hasRituals &&
    state.rituals[ritualInfo.ritualType as keyof typeof state.rituals].length >
      0
  ) {
    const ritualType = ritualInfo.ritualType as keyof typeof state.rituals;
    return {
      ...state,
      rituals: {
        ...state.rituals,
        [ritualType]: []
      }
    };
  }

  return state;
};

const disciplinesReducer = (
  state: DisciplinesState = initialState.character.disciplines,
  action: DisciplinesAction
): DisciplinesState => {
  let category: string,
    trait: string,
    startingDots: number,
    affinity: string,
    maxDots: number,
    newState: DisciplinesState;

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
          state[affinity as keyof DisciplinesState] as any,
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

      const disciplineCategory = state[affinity as keyof DisciplinesState];
      return {
        ...state,
        [affinity]: {
          ...(addPurchasedDot(disciplineCategory as any, trait, maxDots) as any),
          availableStartingDots: (disciplineCategory as any).availableStartingDots
        }
      };
    case types.UNPURCHASE_DOT:
      ({ category, trait } = action.payload);

      if (!isDisciplines(category)) {
        return state;
      }

      affinity = getAffinity(category);

      const disciplineCategoryForRemove = state[affinity as keyof DisciplinesState];
      newState = {
        ...state,
        [affinity]: {
          ...(removePurchasedDot(disciplineCategoryForRemove as any, trait) as any),
          availableStartingDots: (disciplineCategoryForRemove as any).availableStartingDots
        }
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

export default disciplinesReducer;
