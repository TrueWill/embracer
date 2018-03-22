import { createSelector } from 'reselect';
import {
  caitiffInClanDisciplineCount,
  commonDisciplineNames,
  clans
} from '../constants/characterOptions';

const getClanName = state => state.character.basicInfo.clan.name;
const getInClanState = state => state.character.disciplines.inClan;

// returns by affinity
const getDisciplineNames = createSelector(
  [getClanName, getInClanState],
  (clanName, inClanState) => {
    let inClan;

    if (clanName === 'Caitiff') {
      // Caitiff choose their in-clan disciplines from the common ones.
      const selectedInClan = Object.keys(inClanState).filter(
        x => inClanState[x].startingDots
      );

      inClan =
        selectedInClan.length < caitiffInClanDisciplineCount
          ? commonDisciplineNames
          : selectedInClan;
    } else {
      inClan = clanName ? clans.get(clanName).disciplines : [];
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
