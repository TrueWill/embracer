import { getRitualPermutations } from './ritualUtils';

describe('getRitualPermutations', () => {
  it('should handle maximum expected case', () => {
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

  // TODO: Working
});
