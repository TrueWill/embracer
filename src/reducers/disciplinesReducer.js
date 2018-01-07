import initialState from './initialState';

export default (state = initialState.character.disciplines, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
