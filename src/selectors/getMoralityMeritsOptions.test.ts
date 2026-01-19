import deepFreeze from 'deep-freeze';
import getMoralityMeritsOptions from './getMoralityMeritsOptions';
import { createMockRootState } from '../test-utils/mockState';

it('should return correct map for morality merits options when no clan selected', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        clan: { name: '' }
      }
    }
  });

  deepFreeze(state);

  const result = getMoralityMeritsOptions(state);

  expect(result.get('Path of Blood')).toEqual({
    points: 3
  });
});

it('should return correct map for morality merits options when clan discount', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        clan: { name: 'Assamite' }
      }
    }
  });

  deepFreeze(state);

  const result = getMoralityMeritsOptions(state);

  expect(result.get('Path of Blood')).toEqual({
    points: 2
  });
});

it('should return correct map for morality merits options when no clan discount', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        clan: { name: 'Giovanni' }
      }
    }
  });

  deepFreeze(state);

  const result = getMoralityMeritsOptions(state);

  expect(result.get('Path of Blood')).toEqual({
    points: 3
  });
});

it('should return correct map for morality merits options when bloodline discount', () => {
  const state = createMockRootState({
    character: {
      basicInfo: {
        clan: {
          name: 'Followers of Set',
          bloodline: 'Viper',
          meritPoints: 2
        }
      }
    }
  });

  deepFreeze(state);

  const result = getMoralityMeritsOptions(state);

  expect(result.get('Path of Typhon-Set')).toEqual({
    points: 2
  });
});
