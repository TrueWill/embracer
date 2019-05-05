import startsWith from 'lodash.startswith';

const numberStrings = ['One', 'Two', 'Three', 'Four', 'Five'];

export function getRitualPermutations(maxLevel, maxRituals) {
  const getDescription = value => {
    return value
      .map((cur, i) => `${cur} Level ${numberStrings[i]}${cur > 1 ? 's' : ''}`)
      .join(', ');
  };

  if (maxLevel < 1 || maxRituals < 1) {
    return [];
  }

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

export function getRitualInfoForDiscipline(disciplineName) {
  if (startsWith(disciplineName, 'Thaumaturgy')) {
    return {
      hasRituals: true,
      ritualType: 'thaumaturgic'
    };
  }

  if (startsWith(disciplineName, 'Necromancy')) {
    return {
      hasRituals: true,
      ritualType: 'necromantic'
    };
  }

  return {
    hasRituals: false
  };
}

export function calculateRitualsXPCost(rituals, dotCost) {
  if (dotCost.per !== 'level') {
    throw new Error(
      'Rituals XP calculation only supports per level - per was: ' + dotCost.per
    );
  }

  return Object.keys(rituals).reduce(
    (totalXP, key) =>
      totalXP +
      rituals[key].reduce((subtotalXP, numberOfRituals, index) => {
        const level = index + 1;
        const xp = dotCost.xp * level * numberOfRituals;
        return subtotalXP + xp;
      }, 0),
    0
  );
}
