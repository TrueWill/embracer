import deepFreeze from 'deep-freeze';
import getSpecificBackgrounds from './getSpecificBackgrounds';
import { createMockRootState } from '../test-utils/mockState';

it('should return Sabbat-specific backgrounds', () => {
  const state = createMockRootState({
    setting: {
      name: 'Sabbat'
    },
    character: {
      basicInfo: {
        clan: { name: '' }
      }
    }
  });

  deepFreeze(state);

  const result = getSpecificBackgrounds(state);

  expect(result.toString()).toEqual('rituals');
});

it('should return empty for Camarilla', () => {
  const state = createMockRootState({
    setting: {
      name: 'Camarilla'
    },
    character: {
      basicInfo: {
        clan: { name: '' }
      }
    }
  });

  deepFreeze(state);

  const result = getSpecificBackgrounds(state);

  expect(result.length).toEqual(0);
});

it('should return empty for Anarch Movement', () => {
  const state = createMockRootState({
    setting: {
      name: 'Anarch Movement'
    },
    character: {
      basicInfo: {
        clan: { name: '' }
      }
    }
  });

  deepFreeze(state);

  const result = getSpecificBackgrounds(state);

  expect(result.length).toEqual(0);
});

it('should return empty for Other', () => {
  const state = createMockRootState({
    setting: {
      name: 'Other'
    },
    character: {
      basicInfo: {
        clan: { name: '' }
      }
    }
  });

  deepFreeze(state);

  const result = getSpecificBackgrounds(state);

  expect(result.length).toEqual(0);
});
