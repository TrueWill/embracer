import { createSelector } from 'reselect';
import { initialXP, bankedXPLimit } from '../constants/characterOptions';
import { meritsSelector } from '../utils/meritsSelector';
import { flawsSelector } from '../utils/flawsSelector';
import getGenerationDetails from './getGenerationDetails';

const calculateTraitXPCost = (trait, dotCost, initialLevelProperty) => {
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
      dotsPurchased * (dotsPurchased + 1) / 2 + initialLevel * dotsPurchased;

    return dotCost.xp * newLevelsPurchased;
  }
};

const calculateCategoryXPCost = (
  categoryTraits,
  categoryDotCost,
  initialLevelProperty
) =>
  Object.keys(categoryTraits).reduce((acc, key) => {
    const trait = categoryTraits[key];

    const xpCost = calculateTraitXPCost(
      trait,
      categoryDotCost,
      initialLevelProperty
    );

    return acc + xpCost;
  }, 0);

const getAttributes = state => state.character.attributes;
const getSkills = state => state.character.skills;
const getBackgrounds = state => state.character.backgrounds;
const getDisciplines = state => state.character.disciplines;
const getMorality = state => state.character.morality;
// TODO: Looks like it's not currently caching, as the following pseudo-selector always returns a new object.
const getMerits = state => meritsSelector(state);
const getFlaws = state => flawsSelector(state);

const getXP = createSelector(
  [
    getGenerationDetails,
    getAttributes,
    getSkills,
    getBackgrounds,
    getDisciplines,
    getMorality,
    getMerits,
    getFlaws
  ],
  (
    generationDetails,
    attributes,
    skills,
    backgrounds,
    disciplines,
    morality,
    merits,
    flaws
  ) => {
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

    const meritsXPCost = merits.currentPoints;

    const moralityXPCost = calculateTraitXPCost(
      morality,
      dotCost.morality,
      'startingDots'
    );

    const spent =
      attributesXPCost +
      skillsXPCost +
      backgroundsXPCost +
      disciplinesXPCost +
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
