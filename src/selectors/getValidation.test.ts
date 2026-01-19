import deepFreeze from 'deep-freeze';
import cloneDeep from 'lodash.clonedeep';
import initialState from '../reducers/initialState';
import { setDotsFromStartingDots } from '../utils/categoryStarter';
import { standardTraitMaxDots } from '../constants/characterOptions';
import getValidation from './getValidation';
import type { RootState } from '../types';

const setStartingDotsForSkills = (state: RootState, trait: string, startingDots: number) => {
  state.character.skills = setDotsFromStartingDots(
    state.character.skills,
    trait,
    startingDots,
    standardTraitMaxDots
  );
};

const setStartingDotsForBackgrounds = (state: RootState, trait: string, startingDots: number) => {
  state.character.backgrounds = setDotsFromStartingDots(
    state.character.backgrounds,
    trait,
    startingDots,
    standardTraitMaxDots
  );
};

const setStartingDotsForInClan = (state: RootState, trait: string, startingDots: number) => {
  state.character.disciplines.inClan = setDotsFromStartingDots(
    state.character.disciplines.inClan,
    trait,
    startingDots,
    standardTraitMaxDots
  );
};

deepFreeze(initialState);

it('should return correct initial values', () => {
  const result = getValidation(initialState);

  expect(result).toEqual({
    requiredSteps: [
      'Choose Archetype',
      'Choose Clan',
      'Rank Attributes',
      'Select Attribute foci',
      'Set starting dots for Skills',
      'Set starting dots for Backgrounds',
      'Set starting dots for in-clan Disciplines',
      'Spend unbankable XP'
    ]
  });
});

it('should validate archetype when set', () => {
  const state = cloneDeep(initialState);

  state.character.basicInfo.archetype = 'Con Artist';

  deepFreeze(state);

  const result = getValidation(state);

  expect(result.requiredSteps).not.toContain('Choose Archetype');
  expect(result.requiredSteps.length).toBeGreaterThan(1);
});

it('should validate clan when set', () => {
  const state = cloneDeep(initialState);

  state.character.basicInfo.clan.name = 'Brujah';

  deepFreeze(state);

  const result = getValidation(state);

  expect(result.requiredSteps).not.toContain('Choose Clan');
  expect(result.requiredSteps.length).toBeGreaterThan(1);
});

it('should validate attributes when ranked', () => {
  const state = cloneDeep(initialState);

  state.character.attributes.physical.dotsFromRank = 7;
  state.character.attributes.social.dotsFromRank = 5;
  state.character.attributes.mental.dotsFromRank = 3;

  deepFreeze(state);

  const result = getValidation(state);

  expect(result.requiredSteps).not.toContain('Rank Attributes');
  expect(result.requiredSteps.length).toBeGreaterThan(1);
});

it('should not validate attributes when partially ranked', () => {
  const state = cloneDeep(initialState);

  state.character.attributes.physical.dotsFromRank = 7;
  state.character.attributes.mental.dotsFromRank = 3;

  deepFreeze(state);

  const result = getValidation(state);

  expect(result.requiredSteps).toContain('Rank Attributes');
});

it('should validate attributes when foci selected', () => {
  const state = cloneDeep(initialState);

  state.character.attributes.physical.focus = 'Strength';
  state.character.attributes.social.focus = 'Charisma';
  state.character.attributes.mental.focus = 'Wits';

  deepFreeze(state);

  const result = getValidation(state);

  expect(result.requiredSteps).not.toContain('Select Attribute foci');
  expect(result.requiredSteps.length).toBeGreaterThan(1);
});

it('should not validate attributes when foci partially selected', () => {
  const state = cloneDeep(initialState);

  state.character.attributes.physical.focus = 'Strength';
  state.character.attributes.mental.focus = 'Wits';

  deepFreeze(state);

  const result = getValidation(state);

  expect(result.requiredSteps).toContain('Select Attribute foci');
});

it('should validate skills when starting dots set', () => {
  const state = cloneDeep(initialState);

  setStartingDotsForSkills(state, 'academics', 4);
  setStartingDotsForSkills(state, 'animalKen', 3);
  setStartingDotsForSkills(state, 'athletics', 3);
  setStartingDotsForSkills(state, 'awareness', 2);
  setStartingDotsForSkills(state, 'brawl', 2);
  setStartingDotsForSkills(state, 'computer', 2);
  setStartingDotsForSkills(state, 'crafts', 1);
  setStartingDotsForSkills(state, 'dodge', 1);
  setStartingDotsForSkills(state, 'drive', 1);
  setStartingDotsForSkills(state, 'empathy', 1);

  deepFreeze(state);

  const result = getValidation(state);

  expect(result.requiredSteps).not.toContain('Set starting dots for Skills');
  expect(result.requiredSteps.length).toBeGreaterThan(1);
});

it('should not validate skills when starting dots partially set', () => {
  const state = cloneDeep(initialState);

  setStartingDotsForSkills(state, 'academics', 4);
  setStartingDotsForSkills(state, 'animalKen', 3);
  setStartingDotsForSkills(state, 'athletics', 3);
  setStartingDotsForSkills(state, 'awareness', 2);
  setStartingDotsForSkills(state, 'brawl', 2);
  setStartingDotsForSkills(state, 'computer', 2);

  setStartingDotsForSkills(state, 'dodge', 1);
  setStartingDotsForSkills(state, 'drive', 1);
  setStartingDotsForSkills(state, 'empathy', 1);

  deepFreeze(state);

  const result = getValidation(state);

  expect(result.requiredSteps).toContain('Set starting dots for Skills');
});

it('should validate backgrounds when starting dots set', () => {
  const state = cloneDeep(initialState);

  setStartingDotsForBackgrounds(state, 'allies', 3);
  setStartingDotsForBackgrounds(state, 'contacts', 2);

  deepFreeze(state);

  const result = getValidation(state);

  expect(result.requiredSteps).not.toContain(
    'Set starting dots for Backgrounds'
  );
  expect(result.requiredSteps.length).toBeGreaterThan(1);
});

it('should not validate backgrounds when starting dots partially set', () => {
  const state = cloneDeep(initialState);

  setStartingDotsForBackgrounds(state, 'allies', 3);

  deepFreeze(state);

  const result = getValidation(state);

  expect(result.requiredSteps).toContain('Set starting dots for Backgrounds');
});

it('should validate in-clan disciplines when starting dots set', () => {
  const state = cloneDeep(initialState);

  state.character.basicInfo.clan.name = 'Tzimisce';

  setStartingDotsForInClan(state, 'Animalism', 1);
  setStartingDotsForInClan(state, 'Auspex', 1);
  setStartingDotsForInClan(state, 'Vicissitude', 2);

  deepFreeze(state);

  const result = getValidation(state);

  expect(result.requiredSteps).not.toContain(
    'Set starting dots for in-clan Disciplines'
  );
  expect(result.requiredSteps.length).toBeGreaterThan(1);
});

it('should not validate in-clan disciplines when starting dots partially set', () => {
  const state = cloneDeep(initialState);

  state.character.basicInfo.clan.name = 'Tzimisce';

  setStartingDotsForInClan(state, 'Animalism', 1);
  setStartingDotsForInClan(state, 'Auspex', 1);

  deepFreeze(state);

  const result = getValidation(state);

  expect(result.requiredSteps).toContain(
    'Set starting dots for in-clan Disciplines'
  );
});

it('should validate XP when spent', () => {
  const state = cloneDeep(initialState);

  state.character.basicInfo.clan.name = 'Ventrue';
  (state.character.attributes.physical as any).dotsPurchased = 1;
  (state.character.disciplines.inClan as any).Dominate = {
    dotsPurchased: 2
  };

  (state.character.merits as any).push({
    name: 'Paragon',
    points: 3
  });

  (state.character.morality as any).dotsPurchased = 1;

  deepFreeze(state);

  const result = getValidation(state);

  expect(result.requiredSteps).not.toContain('Spend unbankable XP');
});
