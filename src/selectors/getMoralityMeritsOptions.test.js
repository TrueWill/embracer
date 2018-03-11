import deepFreeze from 'deep-freeze';
import getMoralityMeritsOptions from './getMoralityMeritsOptions';

it('should return correct map for morality merits options when no clan selected', () => {
  const state = {
    character: {
      basicInfo: {
        clan: ''
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
        clan: 'Assamite'
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
        clan: 'Giovanni'
      }
    }
  };

  deepFreeze(state);

  const result = getMoralityMeritsOptions(state);

  expect(result.get('Path of Blood')).toEqual({
    points: 3
  });
});
