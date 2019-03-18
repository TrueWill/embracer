const numberStrings = ['One', 'Two', 'Three', 'Four', 'Five'];

export function getRitualPermutations(maxLevel, maxRituals) {
  const getDescription = value => {
    return value
      .map((cur, i) => `${cur} Level ${numberStrings[i]}${cur > 1 ? 's' : ''}`)
      .join(', ');
  };

  const result = [{ description: '(none)', value: [] }];
  const base = maxRituals + 1;
  const iterations = Math.pow(base, maxLevel);

  // Count in the appropriate base.

  for (let i = 1; i <= iterations; i++) {
    const value = [...i.toString(base)].reverse().map(x => parseInt(x, 10));

    // Must learn at least 1 Level One before learning Level Two, etc.
    if (value.indexOf(0) === -1) {
      const total = value.reduce((acc, cur) => acc + cur, 0);

      if (total <= maxRituals) {
        const description = getDescription(value);

        result.push({ description, value });
      }
    }
  }

  return result;
}
