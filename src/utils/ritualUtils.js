const maxRitualLevel = 5;
const numberStrings = ['One', 'Two', 'Three', 'Four', 'Five'];

export function getRitualPermutations(maxLevel, maxRituals) {
  const getDescription = value => {
    return value
      .filter(x => x !== 0)
      .map((cur, i) => `${cur} Level ${numberStrings[i]}${cur > 1 ? 's' : ''}`)
      .join(', ');
  };

  const result = [{ description: '(none)', value: [0, 0, 0, 0, 0] }];

  const base = maxRituals + 1;
  const iterations = Math.pow(base, maxLevel);

  for (let i = 1; i <= iterations; i++) {
    const value = [...i.toString(base)].reverse().map(x => parseInt(x, 10));

    if (value.indexOf(0) === -1) {
      const total = value.reduce((acc, cur) => acc + cur, 0);

      if (total <= maxRituals) {
        while (value.length < maxRitualLevel) {
          value.push(0);
        }

        const description = getDescription(value);

        result.push({ description, value });
      }
    }
  }

  return result;
}
