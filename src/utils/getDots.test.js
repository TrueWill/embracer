import getDots from './getDots';

it('should return 0 if unset', () => {
  const traitState = {};

  const result = getDots(traitState);

  expect(result).toEqual(0);
});

it('should return dots from rank if no other dots', () => {
  const traitState = {
    dotsFromRank: 7
  };

  const result = getDots(traitState);

  expect(result).toEqual(7);
});

it('should return starting dots if no other dots', () => {
  const traitState = {
    startingDots: 3
  };

  const result = getDots(traitState);

  expect(result).toEqual(3);
});

it('should return dots purchased if no other dots', () => {
  const traitState = {
    dotsPurchased: 2
  };

  const result = getDots(traitState);

  expect(result).toEqual(2);
});

it('should add dots from rank to dots purchased', () => {
  const traitState = {
    dotsFromRank: 7,
    dotsPurchased: 1
  };

  const result = getDots(traitState);

  expect(result).toEqual(8);
});

it('should add starting dots to dots purchased', () => {
  const traitState = {
    startingDots: 3,
    dotsPurchased: 2
  };

  const result = getDots(traitState);

  expect(result).toEqual(5);
});
