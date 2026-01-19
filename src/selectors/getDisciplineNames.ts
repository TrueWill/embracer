import { createSelector } from 'reselect';
import {
  commonDisciplineNames,
  clans,
  caitiffInClanDisciplineCount
} from '../constants/clanOptions';
import { getClan, getInClanState } from './simple';

interface DisciplineNamesResult {
  inClan: string[];
  outOfClan: string[];
}

// returns by affinity
const getDisciplineNames = createSelector(
  [getClan, getInClanState],
  (clan, inClanState): DisciplineNamesResult => {
    let inClan: string[];

    if (clan.name === 'Caitiff') {
      // Caitiff choose their in-clan disciplines from the common ones.
      const selectedInClan = Object.keys(inClanState).filter(
        x => inClanState[x].startingDots
      );

      inClan =
        selectedInClan.length < caitiffInClanDisciplineCount
          ? commonDisciplineNames
          : selectedInClan;
    } else if (clan.name) {
      if (clan.bloodline) {
        inClan = clans.get(clan.name).bloodlines.get(clan.bloodline)
          .disciplines;
      } else {
        inClan = clans.get(clan.name).disciplines;
      }
    } else {
      inClan = [];
    }

    const outOfClan =
      inClan.length === 0
        ? []
        : commonDisciplineNames.filter(x => inClan.indexOf(x) === -1);

    return {
      inClan,
      outOfClan
    };
  }
);

export default getDisciplineNames;
