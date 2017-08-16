import * as types from '../constants/actionTypes';

export function updateArchetype(value) {
  return {
    type: types.UPDATE_ARCHETYPE,
    archetype: value
  };
}

export function updateClan(value) {
  return {
    type: types.UPDATE_CLAN,
    clan: value
  };
}
