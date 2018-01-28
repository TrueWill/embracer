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
      return state.filter(x => x.name !== name);
    default:
      return state;
  }
};
