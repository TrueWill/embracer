import { createSelector } from 'reselect';
import { getSelectedRituals, getDisciplines } from './simple';
import {
  getRitualPermutations,
  getRitualInfoForDiscipline
} from '../utils/ritualUtils';
import getDots from '../utils/getDots';
import { getTraitNames } from '../utils/traitUtils';

const getEnhancedRitualInfoForAffinityDisciplines = affinityDisciplines =>
  getTraitNames(affinityDisciplines)
    .map(name => getRitualInfoForDiscipline(name))
    .filter(info => info.hasRituals)
    .map(info => ({
      ...info,
      dots: getDots(affinityDisciplines[info.disciplineName])
    }));

// Assumption: Discipline with most dots is primary path.
// TODO: Consider splitting into multiple pipelines (necro/thau). Find better way to handle display name.

const getRituals = createSelector(
  [getSelectedRituals, getDisciplines],
  (selectedRituals, disciplines) => {
    const info = getEnhancedRitualInfoForAffinityDisciplines(disciplines.inClan)
      .concat(
        getEnhancedRitualInfoForAffinityDisciplines(disciplines.outOfClan)
      )
      .reduce(
        (acc, cur) => ({
          ...acc,
          [cur.ritualType]: {
            maxLevel: Math.max(acc[cur.ritualType].maxLevel, cur.dots),
            maxRituals: acc[cur.ritualType].maxRituals + cur.dots
          }
        }),
        {
          necromantic: {
            maxLevel: 0,
            maxRituals: 0
          },
          thaumaturgic: {
            maxLevel: 0,
            maxRituals: 0
          }
        }
      );

    return {
      necromantic: {
        isAvailable: info.necromantic.maxLevel > 0,
        displayName: 'Necromantic',
        permutations: getRitualPermutations(
          info.necromantic.maxLevel,
          info.necromantic.maxRituals
        ),
        selected: selectedRituals.necromantic
      },
      thaumaturgic: {
        isAvailable: info.thaumaturgic.maxLevel > 0,
        displayName: 'Thaumaturgic',
        permutations: getRitualPermutations(
          info.thaumaturgic.maxLevel,
          info.thaumaturgic.maxRituals
        ),
        selected: selectedRituals.thaumaturgic
      }
    };
  }
);

export default getRituals;
