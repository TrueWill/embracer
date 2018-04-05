import deepFreeze from 'deep-freeze';
import getFlawsOptions from './getFlawsOptions';

it('should return correct map for flaw options', () => {
  const state = {
    setting: {
      name: 'Other'
    },
    character: {
      basicInfo: {
        clan: { name: '' }
      },
      merits: [],
      flaws: [
        {
          name: 'Amnesia',
          points: 1
        }
      ]
    }
  };

  deepFreeze(state);

  const result = getFlawsOptions(state);

  expect(result.has('Amnesia')).toBeFalsy();
  expect(result.get('Addiction')).toEqual({ points: 2 });
  expect(result.get('Archaic')).toEqual({ points: 2 });
  expect(result.has('Soul Shard')).toBeFalsy();
});

it('should return correct map for flaw options when setting selected', () => {
  const state = {
    setting: {
      name: 'Sabbat'
    },
    character: {
      basicInfo: {
        clan: { name: '' }
      },
      merits: [],
      flaws: [
        {
          name: 'Mistrusted',
          points: 1
        },
        {
          name: 'Amnesia',
          points: 1
        }
      ]
    }
  };

  deepFreeze(state);

  const result = getFlawsOptions(state);

  expect(result.has('Mistrusted')).toBeFalsy();
  expect(result.has('Amnesia')).toBeFalsy();
  expect(result.get('Addiction')).toEqual({ points: 2 });
  expect(result.get('Soul Shard')).toEqual({ points: 3 });
});
