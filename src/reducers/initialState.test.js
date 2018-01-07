import initialState from './initialState';

it('should generate initial attributes', () => {
  expect(initialState.character.attributes).toEqual({
    physical: {},
    social: {},
    mental: {}
  });
});
