import deepFreeze from 'deep-freeze';
import {
  getRitualPermutations,
  getRitualInfoForDiscipline,
  calculateRitualsXPCost,
  getRitualsDescription
} from './ritualUtils';

describe('getRitualPermutations', () => {
  it('should return expected when one dot in primary path', () => {
    const maxLevel = 1;
    const maxRituals = 1;

    const result = getRitualPermutations(maxLevel, maxRituals);

    expect(result).toEqual([
      { description: '(none)', value: [] },
      { description: '1 Level One', value: [1] }
    ]);
  });

  it('should return expected when two dots in primary path', () => {
    const maxLevel = 2;
    const maxRituals = 2;

    const result = getRitualPermutations(maxLevel, maxRituals);

    expect(result).toEqual([
      { description: '(none)', value: [] },
      { description: '1 Level One', value: [1] },
      { description: '2 Level Ones', value: [2] },
      { description: '1 Level One, 1 Level Two', value: [1, 1] }
    ]);
  });

  it('should return expected when three dots in primary path', () => {
    const maxLevel = 3;
    const maxRituals = 3;

    const result = getRitualPermutations(maxLevel, maxRituals);

    expect(result).toEqual([
      { description: '(none)', value: [] },
      { description: '1 Level One', value: [1] },
      { description: '2 Level Ones', value: [2] },
      { description: '3 Level Ones', value: [3] },
      { description: '1 Level One, 1 Level Two', value: [1, 1] },
      { description: '2 Level Ones, 1 Level Two', value: [2, 1] },
      { description: '1 Level One, 2 Level Twos', value: [1, 2] },
      {
        description: '1 Level One, 1 Level Two, 1 Level Three',
        value: [1, 1, 1]
      }
    ]);
  });

  it('should return expected when two dots in primary path and one in secondary', () => {
    const maxLevel = 2;
    const maxRituals = 3;

    const result = getRitualPermutations(maxLevel, maxRituals);

    expect(result).toEqual([
      { description: '(none)', value: [] },
      { description: '1 Level One', value: [1] },
      { description: '2 Level Ones', value: [2] },
      { description: '3 Level Ones', value: [3] },
      { description: '1 Level One, 1 Level Two', value: [1, 1] },
      { description: '2 Level Ones, 1 Level Two', value: [2, 1] },
      { description: '1 Level One, 2 Level Twos', value: [1, 2] }
    ]);
  });

  it('should return expected when two dots in primary path and two in secondary', () => {
    const maxLevel = 2;
    const maxRituals = 4;

    const result = getRitualPermutations(maxLevel, maxRituals);

    expect(result).toEqual([
      { description: '(none)', value: [] },
      { description: '1 Level One', value: [1] },
      { description: '2 Level Ones', value: [2] },
      { description: '3 Level Ones', value: [3] },
      { description: '4 Level Ones', value: [4] },
      { description: '1 Level One, 1 Level Two', value: [1, 1] },
      { description: '2 Level Ones, 1 Level Two', value: [2, 1] },
      { description: '3 Level Ones, 1 Level Two', value: [3, 1] },
      { description: '1 Level One, 2 Level Twos', value: [1, 2] },
      { description: '2 Level Ones, 2 Level Twos', value: [2, 2] },
      { description: '1 Level One, 3 Level Twos', value: [1, 3] }
    ]);
  });

  it('should return expected when three dots in primary path and one in secondary', () => {
    const maxLevel = 3;
    const maxRituals = 4;

    const result = getRitualPermutations(maxLevel, maxRituals);

    expect(result).toEqual([
      { description: '(none)', value: [] },
      { description: '1 Level One', value: [1] },
      { description: '2 Level Ones', value: [2] },
      { description: '3 Level Ones', value: [3] },
      { description: '4 Level Ones', value: [4] },
      { description: '1 Level One, 1 Level Two', value: [1, 1] },
      { description: '2 Level Ones, 1 Level Two', value: [2, 1] },
      { description: '3 Level Ones, 1 Level Two', value: [3, 1] },
      { description: '1 Level One, 2 Level Twos', value: [1, 2] },
      { description: '2 Level Ones, 2 Level Twos', value: [2, 2] },
      { description: '1 Level One, 3 Level Twos', value: [1, 3] },
      {
        description: '1 Level One, 1 Level Two, 1 Level Three',
        value: [1, 1, 1]
      },
      {
        description: '2 Level Ones, 1 Level Two, 1 Level Three',
        value: [2, 1, 1]
      },
      {
        description: '1 Level One, 2 Level Twos, 1 Level Three',
        value: [1, 2, 1]
      },
      {
        description: '1 Level One, 1 Level Two, 2 Level Threes',
        value: [1, 1, 2]
      }
    ]);
  });

  it('should return empty array if called with zeros', () => {
    const maxLevel = 0;
    const maxRituals = 0;

    const result = getRitualPermutations(maxLevel, maxRituals);

    expect(result).toEqual([]);
  });
});

describe('getRitualInfoForDiscipline', () => {
  it('should return expected when Thaumaturgy', () => {
    const result = getRitualInfoForDiscipline('Thaumaturgy: Path of Blood');

    expect(result).toEqual({
      hasRituals: true,
      ritualType: 'thaumaturgic'
    });
  });

  it('should return expected when Necromancy', () => {
    const result = getRitualInfoForDiscipline('Necromancy: Mortis Path');

    expect(result).toEqual({
      hasRituals: true,
      ritualType: 'necromantic'
    });
  });

  it('should return expected when Dominate', () => {
    const result = getRitualInfoForDiscipline('Dominate');

    expect(result).toEqual({
      hasRituals: false
    });
  });
});

describe('calculateRitualsXPCost', () => {
  const dotCost = {
    xp: 2,
    per: 'level'
  };

  deepFreeze(dotCost);

  it('should return 0 when no rituals', () => {
    const rituals = {
      necromantic: [],
      thaumaturgic: []
    };

    deepFreeze(rituals);

    const result = calculateRitualsXPCost(rituals, dotCost);

    expect(result).toBe(0);
  });

  it('should return expected when just Thaumaturgic', () => {
    const rituals = {
      necromantic: [],
      thaumaturgic: [1, 1, 1]
    };

    deepFreeze(rituals);

    const result = calculateRitualsXPCost(rituals, dotCost);

    expect(result).toBe(12);
  });

  it('should return expected when Thaumaturgic and Necromantic', () => {
    const rituals = {
      necromantic: [3, 1],
      thaumaturgic: [2, 2]
    };

    deepFreeze(rituals);

    const result = calculateRitualsXPCost(rituals, dotCost);

    expect(result).toBe(22);
  });

  it('should handle variant cost', () => {
    const variantDotCost = {
      xp: 3,
      per: 'level'
    };

    const rituals = {
      necromantic: [2],
      thaumaturgic: [2, 1]
    };

    deepFreeze(variantDotCost);
    deepFreeze(rituals);

    const result = calculateRitualsXPCost(rituals, variantDotCost);

    expect(result).toBe(18);
  });

  it('should throw when not per level', () => {
    const rituals = {
      necromantic: [],
      thaumaturgic: []
    };

    const unsupportedDotCost = {
      xp: 2,
      per: 'each'
    };

    expect(() => {
      calculateRitualsXPCost(rituals, unsupportedDotCost);
    }).toThrow();
  });
});

describe('getRitualsDescription', () => {
  it('should return empty string when no rituals', () => {
    const rituals = [];

    deepFreeze(rituals);

    const result = getRitualsDescription(rituals);

    expect(result).toBe('');
  });

  it('should return expected when one level of rituals', () => {
    const rituals = [3];

    deepFreeze(rituals);

    const result = getRitualsDescription(rituals);

    expect(result).toBe('3 Level Ones');
  });

  it('should return expected when multiple levels of rituals', () => {
    const rituals = [1, 1, 2];

    deepFreeze(rituals);

    const result = getRitualsDescription(rituals);

    expect(result).toBe('1 Level One, 1 Level Two, 2 Level Threes');
  });
});
