import deepFreeze from 'deep-freeze';
import initialState from '../reducers/initialState';
import getValidation from './getValidation';

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

// TODO: Add more tests
