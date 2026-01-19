// non-memoized selector functions, typically used as input-selectors

import type { RootState } from '../reducers';
import type {
  SettingState,
  CharacterState,
  ClanInfo,
  DisciplineCategory,
  MeritFlawItem,
  TraitState,
  AttributesState,
  SkillsState,
  BackgroundsState,
  DisciplinesState,
  RitualsState,
  MoralityState
} from '../types';

export const getIsEraserMode = (state: RootState): boolean => state.mode.isEraser;
export const getSetting = (state: RootState): SettingState => state.setting;
export const getSettingName = (state: RootState): string => state.setting.name;
export const getCharacter = (state: RootState): CharacterState => state.character;
export const getClan = (state: RootState): ClanInfo => state.character.basicInfo.clan;
export const getInClanState = (state: RootState): DisciplineCategory => state.character.disciplines.inClan;
export const getSelectedFlaws = (state: RootState): MeritFlawItem[] => state.character.flaws;
export const getClanName = (state: RootState): string => state.character.basicInfo.clan.name;
export const getBloodline = (state: RootState): string | undefined => state.character.basicInfo.clan.bloodline;
export const getGeneration = (state: RootState): TraitState => state.character.backgrounds.generation as TraitState;
export const getSelectedMerits = (state: RootState): MeritFlawItem[] => state.character.merits;
export const getMoralityMeritPoints = (state: RootState): number | undefined =>
  state.character.morality.meritPoints;
export const getBloodlineMeritPoints = (state: RootState): number | undefined =>
  state.character.basicInfo.clan.meritPoints;
export const getArchetype = (state: RootState): string => state.character.basicInfo.archetype;
export const getPhysicalDotsFromRank = (state: RootState): number | undefined =>
  state.character.attributes.physical.dotsFromRank;
export const getSocialDotsFromRank = (state: RootState): number | undefined =>
  state.character.attributes.social.dotsFromRank;
export const getMentalDotsFromRank = (state: RootState): number | undefined =>
  state.character.attributes.mental.dotsFromRank;
export const getPhysicalFocus = (state: RootState): string | undefined =>
  state.character.attributes.physical.focus;
export const getSocialFocus = (state: RootState): string | undefined => state.character.attributes.social.focus;
export const getMentalFocus = (state: RootState): string | undefined => state.character.attributes.mental.focus;
export const getSkillsAvailableStartingDots = (state: RootState) =>
  state.character.skills.availableStartingDots;
export const getBackgroundsAvailableStartingDots = (state: RootState) =>
  state.character.backgrounds.availableStartingDots;
export const getInClanDisciplinesAvailableStartingDots = (state: RootState) =>
  state.character.disciplines.inClan.availableStartingDots;
export const getAttributes = (state: RootState): AttributesState => state.character.attributes;
export const getSkills = (state: RootState): SkillsState => state.character.skills;
export const getBackgrounds = (state: RootState): BackgroundsState => state.character.backgrounds;
export const getDisciplines = (state: RootState): DisciplinesState => state.character.disciplines;
export const getSelectedRituals = (state: RootState): RitualsState => state.character.disciplines.rituals;
export const getMorality = (state: RootState): MoralityState => state.character.morality;
