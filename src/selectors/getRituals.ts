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
import type { DisciplineCategory, RitualsState, RitualTypeInfo } from '../types';

interface RitualInfo {
  maxLevel: number;
  maxRituals: number;
}

const getEnhancedRitualInfoForAffinityDisciplines = (affinityDisciplines: DisciplineCategory) =>
  getTraitNames(affinityDisciplines)
    .map(disciplineName => ({
      ...getRitualInfoForDiscipline(disciplineName),
      disciplineName
    }))
    .filter(info => info.hasRituals)
    .map(info => ({
      ...info,
      dots: getDots(affinityDisciplines[info.disciplineName] as import('../types').TraitState)
    }));

const getRituals = createSelector(
  [getSelectedRituals, getDisciplines],
  (selectedRituals, disciplines): RitualTypeInfo[] => {
    const ritualInfoMap = getEnhancedRitualInfoForAffinityDisciplines(
      disciplines.inClan
    )
      .concat(
        getEnhancedRitualInfoForAffinityDisciplines(disciplines.outOfClan)
      )
      .reduce((acc, cur) => {
        const ritualType = cur.ritualType!;
        const value = acc.get(ritualType) || {
          maxLevel: 0,
          maxRituals: 0
        };

        acc.set(ritualType, {
          maxLevel: Math.max(value.maxLevel, cur.dots),
          maxRituals: value.maxRituals + cur.dots
        });

        return acc;
      }, new Map<string, RitualInfo>());

    const ritualTypes = mapKeysToArray(ritualInfoMap);

    ritualTypes.sort();

    return ritualTypes.map(ritualType => {
      const ritualInfo = ritualInfoMap.get(ritualType)!;

      return {
        ritualType,
        displayName: capitalizeFirstLetter(ritualType) || ritualType,
        permutations: getRitualPermutations(
          ritualInfo.maxLevel,
          ritualInfo.maxRituals
        ),
        selected: selectedRituals[ritualType as keyof RitualsState] || []
      };
    });
  }
);

export default getRituals;
