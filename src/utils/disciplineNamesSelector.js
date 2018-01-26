import {
  caitiffInClanDisciplineCount,
  commonDisciplineNames,
  disciplineNamesByClan
} from '../constants/characterOptions';

// state is entire state
// returns by affinity
const disciplineNamesSelector = state => {
  let inClan;

  if (state.character.basicInfo.clan === 'Caitiff') {
    // Caitiff choose their in-clan disciplines from the common ones.
    const inClanState = state.character.disciplines.inClan;

    const selectedInClan = Object.keys(inClanState).filter(
      x => inClanState[x].startingDots
    );

    inClan =
      selectedInClan.length < caitiffInClanDisciplineCount
        ? commonDisciplineNames
        : selectedInClan;
  } else {
    inClan = disciplineNamesByClan[state.character.basicInfo.clan] || [];
  }

  const outOfClan =
    inClan.length === 0
      ? []
      : commonDisciplineNames.filter(x => inClan.indexOf(x) === -1);

  return {
    inClan,
    outOfClan
  };
};

export default disciplineNamesSelector;
