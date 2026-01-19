import { createSelector } from 'reselect';
import { initialXP, bankedXPLimit } from '../constants/characterOptions';
import { calculateRitualsXPCost } from '../utils/ritualUtils';
import getMerits from './getMerits';
import getFlaws from './getFlaws';
import getGenerationDetails from './getGenerationDetails';
import {
  getAttributes,
  getSkills,
  getBackgrounds,
  getDisciplines,
  getMorality,
  getBloodline
} from './simple';
import type { TraitState, DotCostInfo } from '../types';

interface XPResult {
  spent: number;
  gainedFromFlaws: number;
  available: number;
  bankable: number;
}

const calculateTraitXPCost = (
  trait: TraitState,
  dotCost: DotCostInfo,
  initialLevelProperty: 'dotsFromRank' | 'startingDots'
): number => {
  const dotsPurchased = trait.dotsPurchased || 0;

  if (dotsPurchased === 0) {
    return 0;
  } else if (dotCost.per === 'each') {
    return dotCost.xp * dotsPurchased;
  } else {
    // per new level
    const initialLevel = trait[initialLevelProperty] || 0;

    // sum of 1st n natural numbers is n(n+1)/2 (n is purchased)
    // add initial * purchased to adjust for initial level
    const newLevelsPurchased =
      (dotsPurchased * (dotsPurchased + 1)) / 2 + initialLevel * dotsPurchased;

    return dotCost.xp * newLevelsPurchased;
  }
};

const calculateCategoryXPCost = (
  categoryTraits: any,
  categoryDotCost: DotCostInfo,
  initialLevelProperty: 'dotsFromRank' | 'startingDots'
): number =>
  Object.keys(categoryTraits).reduce((acc, key) => {
    const trait = categoryTraits[key];

    const xpCost = calculateTraitXPCost(
      trait,
      categoryDotCost,
      initialLevelProperty
    );

    return acc + xpCost;
  }, 0);

const getXP = createSelector(
  [
    getGenerationDetails,
    getAttributes,
    getSkills,
    getBackgrounds,
    getDisciplines,
    getMorality,
    getMerits,
    getFlaws,
    getBloodline
  ],
  (
    generationDetails,
    attributes,
    skills,
    backgrounds,
    disciplines,
    morality,
    merits,
    flaws,
    bloodline
  ): XPResult => {
    const dotCost = generationDetails.dotCost;

    const attributesXPCost = calculateCategoryXPCost(
      attributes,
      dotCost.attributes,
      'dotsFromRank'
    );

    const skillsXPCost = calculateCategoryXPCost(
      skills,
      dotCost.skills,
      'startingDots'
    );

    // Generation costs XP cost of the new generation,
    // but since the cost does not vary after Neonate,
    // this works - if we assume at least 1 starting dot in Generation.
    const backgroundsXPCost = calculateCategoryXPCost(
      backgrounds,
      dotCost.backgrounds,
      'startingDots'
    );

    const disciplinesXPCost =
      calculateCategoryXPCost(
        disciplines.inClan,
        dotCost.disciplines.inClan,
        'startingDots'
      ) +
      calculateCategoryXPCost(
        disciplines.outOfClan,
        dotCost.disciplines.outOfClan,
        'startingDots'
      );

    const ritualsXPCost = calculateRitualsXPCost(
      disciplines.rituals,
      dotCost.rituals
    );

    const meritsXPCost = merits.currentPoints;

    let moralityXPCost = calculateTraitXPCost(
      morality,
      dotCost.morality,
      'startingDots'
    );

    // True Brujah pay double the normal XP costs for dots of Morality.
    if (bloodline === 'True Brujah') {
      moralityXPCost *= 2;
    }

    const spent =
      attributesXPCost +
      skillsXPCost +
      backgroundsXPCost +
      disciplinesXPCost +
      ritualsXPCost +
      meritsXPCost +
      moralityXPCost;

    const gainedFromFlaws = flaws.currentPoints;

    const available = initialXP + gainedFromFlaws - spent;

    const bankable = Math.max(Math.min(available, bankedXPLimit), 0);

    return {
      spent,
      gainedFromFlaws,
      available,
      bankable
    };
  }
);

export default getXP;
