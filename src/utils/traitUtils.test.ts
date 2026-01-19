import deepFreeze from 'deep-freeze';
import { getTraitNames } from './traitUtils';

describe('getTraitNames', () => {
  it('should return sorted when multiple', () => {
    const traits = {
      availableStartingDots: [],
      Dominate: {
        dotsPurchased: 2
      },
      Auspex: {
        dotsPurchased: 1
      }
    };

    deepFreeze(traits);

    const result = getTraitNames(traits);

    expect(result).toEqual(['Auspex', 'Dominate']);
  });

  it('should return empty when none', () => {
    const traits = {
      availableStartingDots: []
    };

    deepFreeze(traits);

    const result = getTraitNames(traits);

    expect(result).toEqual([]);
  });

  it('should return expected when one', () => {
    const traits = {
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
    };

    deepFreeze(traits);

    const result = getTraitNames(traits);

    expect(result).toEqual(['generation']);
  });
});
