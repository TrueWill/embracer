import initialState from './initialState';

it('should generate initial attributes', () => {
  expect(initialState.character.attributes).toEqual({
    physical: {},
    social: {},
    mental: {}
  });
});

it('should set starting dot for generation', () => {
  expect(initialState.character.backgrounds).toEqual({
    availableStartingDots: [
      {
        dots: 3,
        count: 1
      },
      {
        dots: 2,
        count: 1
      },
      {
        dots: 1,
        count: 0
      }
    ],
    generation: {
      startingDots: 1
    }
  });
});
