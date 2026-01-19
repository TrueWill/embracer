import { ThunkAction } from 'redux-thunk';
import * as types from '../constants/actionTypes';
import { humanity } from '../constants/characterOptions';
import getMoralityMeritsOptions from '../selectors/getMoralityMeritsOptions';
import getDots from '../utils/getDots';
import getMerits from '../selectors/getMerits';
import {
  getIsEraserMode,
  getClanName,
  getGeneration,
  getMorality
} from '../selectors/simple';
import type {
  RootState,
  CharacterAction,
  UpdateArchetypeAction,
  UpdateClanAction,
  SetRankAction,
  SetStartingDotsAction,
  SetFocusAction,
  AddMeritAction,
  RemoveMeritAction,
  AddFlawAction,
  RemoveFlawAction,
  PurchaseDotAction,
  UnpurchaseDotAction,
  PurchaseMoralityDotAction,
  UnpurchaseMoralityDotAction,
  UpdateMoralityAction,
  UpdateRitualsAction
} from '../types';

export const updateArchetype = (value: string): UpdateArchetypeAction => ({
  type: types.UPDATE_ARCHETYPE,
  payload: value
});

export const updateClan = (
  name: string,
  bloodline?: string,
  meritPoints?: number
): UpdateClanAction => ({
  type: types.UPDATE_CLAN,
  payload: {
    name,
    bloodline,
    meritPoints
  }
});

export const setRank = (
  category: string,
  trait: string,
  dotsFromRank: number
): SetRankAction => ({
  type: types.SET_RANK,
  payload: {
    category,
    trait,
    dotsFromRank
  }
});

export const setStartingDots = (
  category: string,
  trait: string,
  startingDots: number
): SetStartingDotsAction => ({
  type: types.SET_STARTING_DOTS,
  payload: {
    category,
    trait,
    startingDots
  }
});

export const setFocus = (
  attribute: string,
  focus: string
): SetFocusAction => ({
  type: types.SET_FOCUS,
  payload: {
    attribute,
    focus
  }
});

export const addMerit = (name: string, points: number): AddMeritAction => ({
  type: types.ADD_MERIT,
  payload: {
    name,
    points
  }
});

export const removeMerit = (name: string): RemoveMeritAction => ({
  type: types.REMOVE_MERIT,
  payload: {
    name
  }
});

export const addFlaw = (name: string, points: number): AddFlawAction => ({
  type: types.ADD_FLAW,
  payload: {
    name,
    points
  }
});

export const removeFlaw = (name: string): RemoveFlawAction => ({
  type: types.REMOVE_FLAW,
  payload: {
    name
  }
});

export const purchaseDot = (
  category: string,
  trait: string
): PurchaseDotAction => ({
  type: types.PURCHASE_DOT,
  payload: {
    category,
    trait
  }
});

export const unpurchaseDot = (
  category: string,
  trait: string
): UnpurchaseDotAction => ({
  type: types.UNPURCHASE_DOT,
  payload: {
    category,
    trait
  }
});

export const purchaseOrUnpurchaseDot = (
  category: string,
  trait: string
): ThunkAction<void, RootState, unknown, CharacterAction> => (
  dispatch,
  getState
) => {
  const state = getState();
  const isEraserMode = getIsEraserMode(state);

  if (
    category === 'backgrounds' &&
    trait === 'generation' &&
    !isEraserMode &&
    getClanName(state) === 'Caitiff' &&
    getDots(getGeneration(state)) >= 2
  ) {
    return;
  }

  const actionCreator = isEraserMode ? unpurchaseDot : purchaseDot;

  dispatch(actionCreator(category, trait));
};

export const purchaseMoralityDot = (): PurchaseMoralityDotAction => ({
  type: types.PURCHASE_MORALITY_DOT
});

export const unpurchaseMoralityDot = (): UnpurchaseMoralityDotAction => ({
  type: types.UNPURCHASE_MORALITY_DOT
});

export const purchaseOrUnpurchaseMoralityDot = (): ThunkAction<
  void,
  RootState,
  unknown,
  CharacterAction
> => (dispatch, getState) => {
  const state = getState();

  const actionCreator = getIsEraserMode(state)
    ? unpurchaseMoralityDot
    : purchaseMoralityDot;

  dispatch(actionCreator());
};

export const updateMorality = (
  path: string,
  meritPoints: number
): UpdateMoralityAction => ({
  type: types.UPDATE_MORALITY,
  payload: {
    path,
    meritPoints
  }
});

const getMeritPoints = (
  path: string,
  optionsMap: Map<string, { points: number }>
): number => (path === humanity ? 0 : optionsMap.get(path)!.points);

export const updateMoralityIfPointsAvailable = (
  path: string
): ThunkAction<void, RootState, unknown, CharacterAction> => (
  dispatch,
  getState
) => {
  const state = getState();
  const currentPath = getMorality(state).path;
  const optionsMap = getMoralityMeritsOptions(state);
  let { availablePoints } = getMerits(state);

  const newMeritPoints = getMeritPoints(path, optionsMap);
  const currentMeritPoints = getMeritPoints(currentPath, optionsMap);

  availablePoints += currentMeritPoints;

  if (newMeritPoints <= availablePoints) {
    dispatch(updateMorality(path, newMeritPoints));
  }
};

export const updateRituals = (
  ritualType: string,
  rituals: string[]
): UpdateRitualsAction => ({
  type: types.UPDATE_RITUALS,
  payload: {
    ritualType,
    rituals
  }
});
