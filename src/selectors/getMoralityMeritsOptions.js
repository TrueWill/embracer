import { createSelector } from 'reselect';
import {
  moralityMerits,
  moralityMeritBasePoints,
  moralityMeritClanAffinityDiscount
} from '../constants/merits';
import { getClan } from './simple';

const getMoralityMeritsOptions = createSelector([getClan], clan =>
  moralityMerits.reduce((acc, cur) => {
    acc.set(cur.name, {
      points:
        moralityMeritBasePoints -
        (cur.clanAffinity &&
        (cur.clanAffinity === clan.name || cur.clanAffinity === clan.bloodline)
          ? moralityMeritClanAffinityDiscount
          : 0)
    });
    return acc;
  }, new Map())
);

export default getMoralityMeritsOptions;
