import { getRitualPermutations } from './ritualUtils';

describe('getRitualPermutations', () => {
  it('should handle maximum expected case', () => {
    const maxLevel = 2;
    const maxRituals = 2;

    const result = getRitualPermutations(maxLevel, maxRituals);

    expect(result).toEqual([
      { description: '(none)', value: [0, 0, 0, 0, 0] },
      { description: '1 Level One', value: [1, 0, 0, 0, 0] },
      { description: '2 Level Ones', value: [2, 0, 0, 0, 0] },
      { description: '1 Level One, 1 Level Two', value: [1, 1, 0, 0, 0] }
    ]);
  });

  // TODO: Working
});
