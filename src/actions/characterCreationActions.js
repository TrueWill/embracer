import * as types from '../constants/actionTypes';
import { humanity } from '../constants/characterOptions';
import getMoralityMeritsOptions from '../selectors/getMoralityMeritsOptions';
import getMerits from '../selectors/getMerits';

export const updateArchetype = value => ({
  type: types.UPDATE_ARCHETYPE,
  payload: value
});

// bloodline and meritPoints are optional
export const updateClan = (name, bloodline, meritPoints) => ({
  type: types.UPDATE_CLAN,
  payload: {
    name,
    bloodline,
    meritPoints
  }
});

export const setRank = (category, trait, dotsFromRank) => ({
  type: types.SET_RANK,
  payload: {
    category,
    trait,
    dotsFromRank
  }
});

export const setStartingDots = (category, trait, startingDots) => ({
  type: types.SET_STARTING_DOTS,
  payload: {
    category,
    trait,
    startingDots
  }
});

export const setFocus = (attribute, focus) => ({
  type: types.SET_FOCUS,
  payload: {
    attribute,
    focus
  }
});

export const addMerit = (name, points) => ({
  type: types.ADD_MERIT,
  payload: {
    name,
    points
  }
});

export const removeMerit = name => ({
  type: types.REMOVE_MERIT,
  payload: {
    name
  }
});

export const addFlaw = (name, points) => ({
  type: types.ADD_FLAW,
  payload: {
    name,
    points
  }
});

export const removeFlaw = name => ({
  type: types.REMOVE_FLAW,
  payload: {
    name
  }
});

export const purchaseDot = (category, trait) => ({
  type: types.PURCHASE_DOT,
  payload: {
    category,
    trait
  }
});

export const unpurchaseDot = (category, trait) => ({
  type: types.UNPURCHASE_DOT,
  payload: {
    category,
    trait
  }
});

// thunk
export const purchaseOrUnpurchaseDot = (category, trait) => (
  dispatch,
  getState
) => {
  const state = getState();
  const actionCreator = state.mode.isEraser ? unpurchaseDot : purchaseDot;

  dispatch(actionCreator(category, trait));
};

export const purchaseMoralityDot = () => ({
  type: types.PURCHASE_MORALITY_DOT
});

export const unpurchaseMoralityDot = () => ({
  type: types.UNPURCHASE_MORALITY_DOT
});

// thunk
export const purchaseOrUnpurchaseMoralityDot = () => (dispatch, getState) => {
  const state = getState();

  const actionCreator = state.mode.isEraser
    ? unpurchaseMoralityDot
    : purchaseMoralityDot;

  dispatch(actionCreator());
};

export const updateMorality = (path, meritPoints) => ({
  type: types.UPDATE_MORALITY,
  payload: {
    path,
    meritPoints
  }
});

const getMeritPoints = (path, optionsMap) =>
  path === humanity ? 0 : optionsMap.get(path).points;

// thunk
export const updateMoralityIfPointsAvailable = path => (dispatch, getState) => {
  const state = getState();
  const currentPath = state.character.morality.path;
  const optionsMap = getMoralityMeritsOptions(state);
  let { availablePoints } = getMerits(state);

  const newMeritPoints = getMeritPoints(path, optionsMap);
  const currentMeritPoints = getMeritPoints(currentPath, optionsMap);

  availablePoints += currentMeritPoints;

  if (newMeritPoints <= availablePoints) {
    dispatch(updateMorality(path, newMeritPoints));
  }
};
