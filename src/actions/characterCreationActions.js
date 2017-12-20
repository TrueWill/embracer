import * as types from '../constants/actionTypes';

export function updateArchetype(value) {
  return {
    type: types.UPDATE_ARCHETYPE,
    payload: {
      archetype: value
    }
  };
}

export function updateClan(value) {
  return {
    type: types.UPDATE_CLAN,
    payload: {
      clan: value
    }
  };
}
