import {
  moralityMerits,
  moralityMeritBasePoints,
  moralityMeritClanAffinityDiscount
} from '../constants/merits';

// TODO: Convert to reselect
export const moralityMeritsOptionsSelector = state => {
  const clan = state.character.basicInfo.clan;

  return moralityMerits.reduce((acc, cur) => {
    acc.set(cur.name, {
      points:
        moralityMeritBasePoints -
        (cur.clanAffinity && cur.clanAffinity === clan
          ? moralityMeritClanAffinityDiscount
          : 0)
    });
    return acc;
  }, new Map());
};
