import { initialXP, bankedXPLimit } from '../constants/characterOptions';
import generationSelector from './generationSelector';
import { meritsFlawsSelector } from './meritsFlawsSelector';

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

const xpSelector = state => {
  const dotCost = generationSelector(state).dotCost;

  const attributesXPCost = calculateCategoryXPCost(
    state.character.attributes,
    dotCost.attributes,
    'dotsFromRank'
  );

  const skillsXPCost = calculateCategoryXPCost(
    state.character.skills,
    dotCost.skills,
    'startingDots'
  );

  // Generation costs XP cost of the new generation,
  // but since the cost does not vary after Neonate,
  // this works - if we assume at least 1 starting dot in Generation.
  const backgroundsXPCost = calculateCategoryXPCost(
    state.character.backgrounds,
    dotCost.backgrounds,
    'startingDots'
  );

  const disciplinesXPCost =
    calculateCategoryXPCost(
      state.character.disciplines.inClan,
      dotCost.disciplines.inClan,
      'startingDots'
    ) +
    calculateCategoryXPCost(
      state.character.disciplines.outOfClan,
      dotCost.disciplines.outOfClan,
      'startingDots'
    );

  const meritsXPCost = meritsFlawsSelector(state, 'merits').currentPoints;

  const spent =
    attributesXPCost +
    skillsXPCost +
    backgroundsXPCost +
    disciplinesXPCost +
    meritsXPCost;

  const gainedFromFlaws = meritsFlawsSelector(state, 'flaws').currentPoints;

  const available = initialXP + gainedFromFlaws - spent;

  const bankable = Math.max(Math.min(available, bankedXPLimit), 0);

  return {
    spent,
    gainedFromFlaws,
    available,
    bankable
  };
};

export default xpSelector;
