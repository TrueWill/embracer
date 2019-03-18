import { getRitualPermutations } from './ritualUtils';

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

  it('should throw if called with zeros', () => {
    expect(() => getRitualPermutations(0, 0)).toThrowError(
      'parameters must be 1 or higher'
    );
  });
});
