import * as types from '../constants/actionTypes';

export const updateArchetype = value => ({
  type: types.UPDATE_ARCHETYPE,
  payload: value
});

export const updateClan = value => ({
  type: types.UPDATE_CLAN,
  payload: value
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

export const purchaseMoralityDot = () => ({
  type: types.PURCHASE_MORALITY_DOT
});

export const unpurchaseMoralityDot = () => ({
  type: types.UNPURCHASE_MORALITY_DOT
});

export const updateMorality = (path, meritPoints) => ({
  type: types.UPDATE_MORALITY,
  payload: {
    path,
    meritPoints
  }
});
