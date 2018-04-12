import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.character.merits, action) => {
  switch (action.type) {
    case types.ADD_MERIT:
      const newState = state.slice();
      newState.push(action.payload);
      return newState;
    case types.REMOVE_MERIT:
      const { name } = action.payload;
      let found = false;
      return state.filter(x => {
        if (found) {
          // multiple, and one instance already removed, so preserve
          return true;
        }
        found = x.name === name;
        return !found;
      });
    case types.UPDATE_SETTING:
      // reset, as there are setting-specific merits
      return initialState.character.merits;
    case types.UPDATE_CLAN:
      // reset, as there are clan-specific merits
      return initialState.character.merits;
    default:
      return state;
  }
};
