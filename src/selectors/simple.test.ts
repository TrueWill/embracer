import initialState from '../reducers/initialState';
import type { RootState } from '../reducers';
import {
  getIsEraserMode,
  getSetting,
  getSettingName,
  getCharacter,
  getClan,
  getClanName,
  getBloodline,
  getSelectedFlaws,
  getSelectedMerits,
  getArchetype,
  getAttributes,
  getSkills,
  getBackgrounds,
  getDisciplines,
  getMorality,
  getSelectedRituals,
  getMoralityMeritPoints,
  getBloodlineMeritPoints,
  getPhysicalDotsFromRank,
  getSocialDotsFromRank,
  getMentalDotsFromRank,
  getPhysicalFocus,
  getSocialFocus,
  getMentalFocus,
  getSkillsAvailableStartingDots,
  getBackgroundsAvailableStartingDots,
  getInClanDisciplinesAvailableStartingDots
} from './simple';

const state = initialState as unknown as RootState;

it('should get isEraser mode', () => {
  expect(getIsEraserMode(state)).toBe(false);
});

it('should get setting', () => {
  expect(getSetting(state)).toEqual({ name: 'Camarilla' });
});

it('should get setting name', () => {
  expect(getSettingName(state)).toBe('Camarilla');
});

it('should get character', () => {
  expect(getCharacter(state)).toBe(state.character);
});

it('should get clan', () => {
  expect(getClan(state)).toEqual({ name: '' });
});

it('should get clan name', () => {
  expect(getClanName(state)).toBe('');
});

it('should get bloodline as undefined when none set', () => {
  expect(getBloodline(state)).toBeUndefined();
});

it('should get selected flaws', () => {
  expect(getSelectedFlaws(state)).toEqual([]);
});

it('should get selected merits', () => {
  expect(getSelectedMerits(state)).toEqual([]);
});

it('should get archetype', () => {
  expect(getArchetype(state)).toBe('');
});

it('should get attributes', () => {
  expect(getAttributes(state)).toBe(state.character.attributes);
});

it('should get skills', () => {
  expect(getSkills(state)).toBe(state.character.skills);
});

it('should get backgrounds', () => {
  expect(getBackgrounds(state)).toBe(state.character.backgrounds);
});

it('should get disciplines', () => {
  expect(getDisciplines(state)).toBe(state.character.disciplines);
});

it('should get morality', () => {
  expect(getMorality(state)).toBe(state.character.morality);
});

it('should get selected rituals', () => {
  expect(getSelectedRituals(state)).toEqual({
    necromantic: [],
    thaumaturgic: []
  });
});

it('should get morality merit points as undefined initially', () => {
  expect(getMoralityMeritPoints(state)).toBeUndefined();
});

it('should get bloodline merit points as undefined initially', () => {
  expect(getBloodlineMeritPoints(state)).toBeUndefined();
});

it('should get physical dots from rank as undefined initially', () => {
  expect(getPhysicalDotsFromRank(state)).toBeUndefined();
});

it('should get social dots from rank as undefined initially', () => {
  expect(getSocialDotsFromRank(state)).toBeUndefined();
});

it('should get mental dots from rank as undefined initially', () => {
  expect(getMentalDotsFromRank(state)).toBeUndefined();
});

it('should get physical focus as undefined initially', () => {
  expect(getPhysicalFocus(state)).toBeUndefined();
});

it('should get social focus as undefined initially', () => {
  expect(getSocialFocus(state)).toBeUndefined();
});

it('should get mental focus as undefined initially', () => {
  expect(getMentalFocus(state)).toBeUndefined();
});

it('should get skills available starting dots', () => {
  expect(getSkillsAvailableStartingDots(state)).toEqual(
    state.character.skills.availableStartingDots
  );
});

it('should get backgrounds available starting dots', () => {
  expect(getBackgroundsAvailableStartingDots(state)).toEqual(
    state.character.backgrounds.availableStartingDots
  );
});

it('should get in-clan disciplines available starting dots', () => {
  expect(getInClanDisciplinesAvailableStartingDots(state)).toEqual(
    state.character.disciplines.inClan.availableStartingDots
  );
});
