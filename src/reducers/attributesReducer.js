import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.character.attributes, action) => {
  switch (action.type) {
    case types.SET_RANK:
      const { category, trait, rank, dots } = action.payload;

      if (category !== 'attributes') {
        return state;
      }

      const updatedTrait = { dots, rank };

      for (let otherTrait in state) {
        if (
          state.hasOwnProperty(otherTrait) &&
          otherTrait !== trait &&
          state[otherTrait].rank === rank
        ) {
          return {
            ...state,
            [trait]: updatedTrait,
            [otherTrait]: { dots: 0 }
          };
        }
      }

      return { ...state, [trait]: updatedTrait };
    default:
      return state;
  }
};
