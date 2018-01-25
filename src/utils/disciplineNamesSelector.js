import {
  disciplineNamesByClan,
  commonDisciplineNames
} from '../constants/characterOptions';

// state is entire state
// returns by affinity
const disciplineNamesSelector = state => {
  const inClan = disciplineNamesByClan[state.character.basicInfo.clan] || [];

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
