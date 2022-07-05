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
import {
  Action,
  ClanSetting,
  DotLocation,
  FocusSetting,
  MoralitySetting,
  RankSetting,
  RitualsSetting,
  StandardMeritFlaw,
  StartingDotsSetting
} from '../types';

export const updateArchetype: (value: string) => Action<string> = value => ({
  type: types.UPDATE_ARCHETYPE,
  payload: value
});

export const updateClan: (
  name: string,
  bloodline?: string,
  meritPoints?: number
) => Action<ClanSetting> = (name, bloodline, meritPoints) => ({
  type: types.UPDATE_CLAN,
  payload: {
    name,
    bloodline,
    meritPoints
  }
});

export const setRank: (
  category: 'attributes' | 'skills',
  trait: string,
  dotsFromRank: number
) => Action<RankSetting> = (category, trait, dotsFromRank) => ({
  type: types.SET_RANK,
  payload: {
    category,
    trait,
    dotsFromRank
  }
});

export const setStartingDots: (
  category: string,
  trait: string,
  startingDots: number
) => Action<StartingDotsSetting> = (category, trait, startingDots) => ({
  type: types.SET_STARTING_DOTS,
  payload: {
    category,
    trait,
    startingDots
  }
});

export const setFocus: (
  attribute: string,
  focus: string
) => Action<FocusSetting> = (attribute, focus) => ({
  type: types.SET_FOCUS,
  payload: {
    attribute,
    focus
  }
});

export const addMerit: (
  name: string,
  points: number
) => Action<StandardMeritFlaw> = (name, points) => ({
  type: types.ADD_MERIT,
  payload: {
    name,
    points
  }
});

export const removeMerit: (
  name: string
) => Action<{ name: string }> = name => ({
  type: types.REMOVE_MERIT,
  payload: {
    name
  }
});

export const addFlaw: (
  name: string,
  points: number
) => Action<StandardMeritFlaw> = (name, points) => ({
  type: types.ADD_FLAW,
  payload: {
    name,
    points
  }
});

export const removeFlaw: (name: string) => Action<{ name: string }> = name => ({
  type: types.REMOVE_FLAW,
  payload: {
    name
  }
});

export const purchaseDot: (
  category: string,
  trait: string
) => Action<DotLocation> = (category, trait) => ({
  type: types.PURCHASE_DOT,
  payload: {
    category,
    trait
  }
});

export const unpurchaseDot: (
  category: string,
  trait: string
) => Action<DotLocation> = (category, trait) => ({
  type: types.UNPURCHASE_DOT,
  payload: {
    category,
    trait
  }
});

// TODO: See https://redux.js.org/usage/usage-with-typescript - type from store - also other thunks
// thunk
export const purchaseOrUnpurchaseDot: (
  category: string,
  trait: string
) => (dispatch: any, getState: any) => void = (category, trait) => (
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

export const purchaseMoralityDot = () => ({
  type: types.PURCHASE_MORALITY_DOT
});

export const unpurchaseMoralityDot = () => ({
  type: types.UNPURCHASE_MORALITY_DOT
});

// thunk
export const purchaseOrUnpurchaseMoralityDot: () => (
  dispatch: any,
  getState: any
) => void = () => (dispatch, getState) => {
  const state = getState();

  const actionCreator = getIsEraserMode(state)
    ? unpurchaseMoralityDot
    : purchaseMoralityDot;

  dispatch(actionCreator());
};

export const updateMorality: (
  path: string,
  meritPoints: number
) => Action<MoralitySetting> = (path, meritPoints) => ({
  type: types.UPDATE_MORALITY,
  payload: {
    path,
    meritPoints
  }
});

// TODO: Type optionsMap
const getMeritPoints: (path: string, optionsMap: any) => number = (
  path,
  optionsMap
) => (path === humanity ? 0 : optionsMap.get(path).points);

// thunk
export const updateMoralityIfPointsAvailable: (
  path: string
) => (dispatch: any, getState: any) => void = path => (dispatch, getState) => {
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

export const updateRituals: (
  ritualType: string,
  rituals: number[]
) => Action<RitualsSetting> = (ritualType, rituals) => ({
  type: types.UPDATE_RITUALS,
  payload: {
    ritualType,
    rituals
  }
});
