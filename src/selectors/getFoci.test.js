import deepFreeze from 'deep-freeze';
import { standardFoci } from '../constants/characterOptions';
import getFoci from './getFoci';

deepFreeze(standardFoci);

it('should return correct foci when no clan selected', () => {
  const state = {
    character: {
      basicInfo: {
        clan: { name: '' }
      }
    }
  };

  deepFreeze(state);

  const result = getFoci(state);

  expect(result).toBe(standardFoci);
});

it('should return correct foci when no clan restrictions', () => {
  const state = {
    character: {
      basicInfo: {
        clan: { name: 'Assamite' }
      }
    }
  };

  deepFreeze(state);

  const result = getFoci(state);

  expect(result).toBe(standardFoci);
});

it('should return correct foci when clan restrictions', () => {
  const state = {
    character: {
      basicInfo: {
        clan: { name: 'Nosferatu' }
      }
    }
  };

  deepFreeze(state);

  const result = getFoci(state);

  expect(result).toEqual({
    physical: ['Strength', 'Dexterity', 'Stamina'],
    social: ['Charisma', 'Manipulation'],
    mental: ['Perception', 'Intelligence', 'Wits']
  });
});
