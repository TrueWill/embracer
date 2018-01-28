import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.character.meritsFlaws, action) => {
  switch (action.type) {
    case types.ADD_MERIT_FLAW:
      const newState = state.slice();
      newState.push(action.payload);
      return newState;
    case types.REMOVE_MERIT_FLAW:
      const { name } = action.payload;
      return state.filter(x => x.name !== name);
    default:
      return state;
  }
};
