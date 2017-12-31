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
