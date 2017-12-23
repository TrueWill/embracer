import * as types from '../constants/actionTypes';

export const updateArchetype = value => ({
  type: types.UPDATE_ARCHETYPE,
  payload: {
    archetype: value
  }
});

export const updateClan = value => ({
  type: types.UPDATE_CLAN,
  payload: {
    clan: value
  }
});
