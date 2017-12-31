import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { setDotsFromRank } from '../utils/categoryRanker';

export default (state = initialState.character.skills, action) => {
  switch (action.type) {
    case types.SET_RANK:
      const { category, trait, dotsFromRank } = action.payload;

      if (category !== 'skills') {
        return state;
      }

      return setDotsFromRank(state, trait, dotsFromRank);
    default:
      return state;
  }
};
