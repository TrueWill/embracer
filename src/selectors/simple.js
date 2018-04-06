// non-memoized selector functions, typically used as input-selectors

export const getSettingName = state => state.setting.name;
export const getClan = state => state.character.basicInfo.clan;
export const getInClanState = state => state.character.disciplines.inClan;
export const getSelectedFlaws = state => state.character.flaws;
export const getClanName = state => state.character.basicInfo.clan.name;
export const getGeneration = state => state.character.backgrounds.generation;
export const getSelectedMerits = state => state.character.merits;
export const getMoralityMeritPoints = state =>
  state.character.morality.meritPoints;
export const getBloodlineMeritPoints = state =>
  state.character.basicInfo.clan.meritPoints;
export const getArchetype = state => state.character.basicInfo.archetype;
export const getPhysicalDotsFromRank = state =>
  state.character.attributes.physical.dotsFromRank;
export const getSocialDotsFromRank = state =>
  state.character.attributes.social.dotsFromRank;
export const getMentalDotsFromRank = state =>
  state.character.attributes.mental.dotsFromRank;
export const getPhysicalFocus = state =>
  state.character.attributes.physical.focus;
export const getSocialFocus = state => state.character.attributes.social.focus;
export const getMentalFocus = state => state.character.attributes.mental.focus;
export const getSkillsAvailableStartingDots = state =>
  state.character.skills.availableStartingDots;
export const getBackgroundsAvailableStartingDots = state =>
  state.character.backgrounds.availableStartingDots;
export const getInClanDisciplinesAvailableStartingDots = state =>
  state.character.disciplines.inClan.availableStartingDots;
export const getAttributes = state => state.character.attributes;
export const getSkills = state => state.character.skills;
export const getBackgrounds = state => state.character.backgrounds;
export const getDisciplines = state => state.character.disciplines;
export const getMorality = state => state.character.morality;
