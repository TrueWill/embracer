import { createSelector } from 'reselect';
import getXP from './getXP';
import {
  getArchetype,
  getClanName,
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
import type { AvailableStartingDot } from '../types';

interface XPInfo {
  available: number;
  bankable: number;
}

// Higher-order functions
const validateTruthy = (failureMessage: string) => (value: any): string[] =>
  value ? [] : [failureMessage];

const validateStartingDots = (traitCategoryName: string) => (availableStartingDots: AvailableStartingDot[]): string[] =>
  validateTruthy('Set starting dots for ' + traitCategoryName)(
    availableStartingDots.every(available => available.count === 0)
  );

// Validators
const validateArchetype = validateTruthy('Choose Archetype');
const validateClanName = validateTruthy('Choose Clan');

const validateAttributeRanks = (
  physicalDotsFromRank: number | undefined,
  socialDotsFromRank: number | undefined,
  mentalDotsFromRank: number | undefined
): string[] =>
  validateTruthy('Rank Attributes')(
    physicalDotsFromRank && socialDotsFromRank && mentalDotsFromRank
  );

const validateAttributeFoci = (
  physicalFocus: string | undefined,
  socialFocus: string | undefined,
  mentalFocus: string | undefined
): string[] =>
  validateTruthy('Select Attribute foci')(
    physicalFocus && socialFocus && mentalFocus
  );

const validateSkillsStartingDots = validateStartingDots('Skills');
const validateBackgroundsStartingDots = validateStartingDots('Backgrounds');
const validateInClanDisciplinesStartingDots = validateStartingDots(
  'in-clan Disciplines'
);

const validateXP = (xp: XPInfo): string[] =>
  validateTruthy('Spend unbankable XP')(xp.available <= xp.bankable);

// NOTE: If decide to change UI to display all steps with red X's/green checks,
// this could return an array of objects with Boolean properties.

interface ValidationResult {
  requiredSteps: string[];
}

const getValidation = createSelector(
  [
    getArchetype,
    getClanName,
    getPhysicalDotsFromRank,
    getSocialDotsFromRank,
    getMentalDotsFromRank,
    getPhysicalFocus,
    getSocialFocus,
    getMentalFocus,
    getSkillsAvailableStartingDots,
    getBackgroundsAvailableStartingDots,
    getInClanDisciplinesAvailableStartingDots,
    getXP
  ],
  (
    archetype,
    clanName,
    physicalDotsFromRank,
    socialDotsFromRank,
    mentalDotsFromRank,
    physicalFocus,
    socialFocus,
    mentalFocus,
    skillsAvailableStartingDots,
    backgroundsAvailableStartingDots,
    inClanDisciplinesAvailableStartingDots,
    xp
  ): ValidationResult => {
    const requiredSteps = validateArchetype(archetype)
      .concat(validateClanName(clanName))
      .concat(
        validateAttributeRanks(
          physicalDotsFromRank,
          socialDotsFromRank,
          mentalDotsFromRank
        )
      )
      .concat(validateAttributeFoci(physicalFocus, socialFocus, mentalFocus))
      .concat(validateSkillsStartingDots(skillsAvailableStartingDots))
      .concat(validateBackgroundsStartingDots(backgroundsAvailableStartingDots))
      .concat(
        validateInClanDisciplinesStartingDots(
          inClanDisciplinesAvailableStartingDots
        )
      )
      .concat(validateXP(xp));

    return {
      requiredSteps
    };
  }
);

export default getValidation;
