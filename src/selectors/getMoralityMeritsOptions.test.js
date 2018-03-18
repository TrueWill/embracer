import deepFreeze from 'deep-freeze';
import getMoralityMeritsOptions from './getMoralityMeritsOptions';

it('should return correct map for morality merits options when no clan selected', () => {
  const state = {
    character: {
      basicInfo: {
        clan: { name: '' }
      }
    }
  };

  deepFreeze(state);

  const result = getMoralityMeritsOptions(state);

  expect(result.get('Path of Blood')).toEqual({
    points: 3
  });
});

it('should return correct map for morality merits options when clan discount', () => {
  const state = {
    character: {
      basicInfo: {
        clan: { name: 'Assamite' }
      }
    }
  };

  deepFreeze(state);

  const result = getMoralityMeritsOptions(state);

  expect(result.get('Path of Blood')).toEqual({
    points: 2
  });
});

it('should return correct map for morality merits options when no clan discount', () => {
  const state = {
    character: {
      basicInfo: {
        clan: { name: 'Giovanni' }
      }
    }
  };

  deepFreeze(state);

  const result = getMoralityMeritsOptions(state);

  expect(result.get('Path of Blood')).toEqual({
    points: 3
  });
});
