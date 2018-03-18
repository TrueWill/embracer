import { createSelector } from 'reselect';
import {
  moralityMerits,
  moralityMeritBasePoints,
  moralityMeritClanAffinityDiscount
} from '../constants/merits';

const getClanName = state => state.character.basicInfo.clan.name;

const getMoralityMeritsOptions = createSelector([getClanName], clanName =>
  moralityMerits.reduce((acc, cur) => {
    acc.set(cur.name, {
      points:
        moralityMeritBasePoints -
        (cur.clanAffinity && cur.clanAffinity === clanName
          ? moralityMeritClanAffinityDiscount
          : 0)
    });
    return acc;
  }, new Map())
);

export default getMoralityMeritsOptions;
