import { createSelector } from 'reselect';
import { getSelectedRituals, getDisciplines } from './simple';
import {
  getRitualPermutations,
  getRitualInfoForDiscipline
} from '../utils/ritualUtils';
import getDots from '../utils/getDots';

const startingDotsProperty = 'availableStartingDots';

// TODO: Copied from Pdf.js (along with constant) - consolidate
const getTraitNames = traits => {
  const names = Object.keys(traits).filter(x => x !== startingDotsProperty);

  names.sort();

  return names;
};

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
// TODO: Consider making permutations handle 0 case.

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
        permutations:
          info.necromantic.maxLevel > 0
            ? getRitualPermutations(
                info.necromantic.maxLevel,
                info.necromantic.maxRituals
              )
            : [],
        selected: selectedRituals.necromantic
      },
      thaumaturgic: {
        isAvailable: info.thaumaturgic.maxLevel > 0,
        displayName: 'Thaumaturgic',
        permutations:
          info.thaumaturgic.maxLevel > 0
            ? getRitualPermutations(
                info.thaumaturgic.maxLevel,
                info.thaumaturgic.maxRituals
              )
            : [],
        selected: selectedRituals.thaumaturgic
      }
    };
  }
);

export default getRituals;
