import deepFreeze from 'deep-freeze';
import getGenerationDetails from './getGenerationDetails';

it('should return correct values for Neonate', () => {
  const state = {
    character: {
      backgrounds: {
        generation: {
          startingDots: 1
        }
      }
    }
  };

  deepFreeze(state);

  const result = getGenerationDetails(state);

  expect(result).toMatchObject({
    title: 'Neonate',
    bloodPool: 10,
    bloodPerTurn: 1,
    attributeBonus: 1
  });

  expect(result).toHaveProperty('dotCost');
});

it('should return correct values for Luminary Elder', () => {
  const state = {
    character: {
      backgrounds: {
        generation: {
          startingDots: 3,
          dotsPurchased: 2
        }
      }
    }
  };

  deepFreeze(state);

  const result = getGenerationDetails(state);

  expect(result).toMatchObject({
    title: 'Luminary Elder',
    bloodPool: 30,
    bloodPerTurn: 5,
    attributeBonus: 5
  });

  expect(result).toHaveProperty('dotCost');
});
