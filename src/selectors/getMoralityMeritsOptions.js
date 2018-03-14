import { createSelector } from 'reselect';
import {
  moralityMerits,
  moralityMeritBasePoints,
  moralityMeritClanAffinityDiscount
} from '../constants/merits';

const getClan = state => state.character.basicInfo.clan;

const getMoralityMeritsOptions = createSelector([getClan], clan =>
  moralityMerits.reduce((acc, cur) => {
    acc.set(cur.name, {
      points:
        moralityMeritBasePoints -
        (cur.clanAffinity && cur.clanAffinity === clan
          ? moralityMeritClanAffinityDiscount
          : 0)
    });
    return acc;
  }, new Map())
);

export default getMoralityMeritsOptions;
