import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { setDotsFromRank } from '../utils/categoryRanker';

export default (state = initialState.character.attributes, action) => {
  switch (action.type) {
    case types.SET_RANK:
      const { category, trait, dotsFromRank } = action.payload;

      if (category !== 'attributes') {
        return state;
      }

      return setDotsFromRank(state, trait, dotsFromRank);
    default:
      return state;
  }
};
