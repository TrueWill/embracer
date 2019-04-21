import { createSelector } from 'reselect';
import { getSelectedRituals, getDisciplines } from './simple';
import {
  getRitualPermutations,
  getRitualInfoForDiscipline
} from '../utils/ritualUtils';
import getDots from '../utils/getDots';
import { getTraitNames } from '../utils/traitUtils';
import { mapKeysToArray } from '../utils/mapUtils';
import { capitalizeFirstLetter } from '../utils/stringUtils';

const getEnhancedRitualInfoForAffinityDisciplines = affinityDisciplines =>
  getTraitNames(affinityDisciplines)
    .map(disciplineName => ({
      ...getRitualInfoForDiscipline(disciplineName),
      disciplineName
    }))
    .filter(info => info.hasRituals)
    .map(info => ({
      ...info,
      dots: getDots(affinityDisciplines[info.disciplineName])
    }));

// Assumption: Discipline with most dots is primary path.

const getRituals = createSelector(
  [getSelectedRituals, getDisciplines],
  (selectedRituals, disciplines) => {
    const ritualInfoMap = getEnhancedRitualInfoForAffinityDisciplines(
      disciplines.inClan
    )
      .concat(
        getEnhancedRitualInfoForAffinityDisciplines(disciplines.outOfClan)
      )
      .reduce((acc, cur) => {
        const value = acc.get(cur.ritualType) || {
          maxLevel: 0,
          maxRituals: 0
        };

        acc.set(cur.ritualType, {
          maxLevel: Math.max(value.maxLevel, cur.dots),
          maxRituals: value.maxRituals + cur.dots
        });

        return acc;
      }, new Map());

    const ritualTypes = mapKeysToArray(ritualInfoMap);

    ritualTypes.sort();

    return ritualTypes.map(ritualType => {
      const ritualInfo = ritualInfoMap.get(ritualType);

      return {
        ritualType,
        displayName: capitalizeFirstLetter(ritualType),
        permutations: getRitualPermutations(
          ritualInfo.maxLevel,
          ritualInfo.maxRituals
        ),
        selected: selectedRituals[ritualType]
      };
    });
  }
);

export default getRituals;
