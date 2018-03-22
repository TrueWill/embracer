import { createSelector } from 'reselect';
import {
  caitiffInClanDisciplineCount,
  commonDisciplineNames,
  clans
} from '../constants/characterOptions';

const getClan = state => state.character.basicInfo.clan;
const getInClanState = state => state.character.disciplines.inClan;

// returns by affinity
const getDisciplineNames = createSelector(
  [getClan, getInClanState],
  (clan, inClanState) => {
    let inClan;

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
