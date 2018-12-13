import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.character.flaws, action) => {
  switch (action.type) {
    case types.ADD_FLAW:
      const newState = state.slice();
      newState.push(action.payload);
      return newState;
    case types.REMOVE_FLAW:
      const { name } = action.payload;
      return state.filter(x => x.name !== name);
    case types.UPDATE_SETTING:
      // reset, as there are setting-specific flaws
      return initialState.character.flaws;
    default:
      return state;
  }
};
