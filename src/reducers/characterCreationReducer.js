import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.character, action) => {
  switch (action.type) {
    case types.UPDATE_ARCHETYPE:
      return { ...state, archetype: action.payload };
    case types.UPDATE_CLAN:
      return { ...state, clan: action.payload };
    case types.SET_RANK:
      const { category, trait, rank, dots } = action.payload;
      // TODO: refactor or revise
      let newCategory;
      for (let otherTrait in state[category]) {
        if (
          state[category].hasOwnProperty(otherTrait) &&
          otherTrait !== trait &&
          state[category][otherTrait].rank === rank
        ) {
          newCategory = {
            ...state[category],
            [trait]: { dots, rank },
            [otherTrait]: { dots: 0 }
          };
          break;
        }
      }
      if (!newCategory) {
        newCategory = { ...state[category], [trait]: { dots, rank } };
      }
      return { ...state, [category]: newCategory };
    default:
      return state;
  }
};
