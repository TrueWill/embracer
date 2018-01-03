import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { setDotsFromStartingDots } from '../utils/categoryStarter';

export default (state = initialState.character.skills, action) => {
  switch (action.type) {
    case types.SET_STARTING_DOTS:
      const { category, trait, startingDots } = action.payload;

      if (category !== 'skills') {
        return state;
      }

      return setDotsFromStartingDots(state, trait, startingDots);
    default:
      return state;
  }
};
