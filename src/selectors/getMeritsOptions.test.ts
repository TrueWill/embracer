import deepFreeze from 'deep-freeze';
import getMeritsOptions from './getMeritsOptions';
import { createMockRootState } from '../test-utils/mockState';

it('should return correct map for merit options when clan selected', () => {
  const state = createMockRootState({
    setting: {
      name: 'Other'
    },
    character: {
      basicInfo: {
        clan: { name: 'Tzimisce' }
      },
      merits: [
        {
          name: 'Ambidextrous',
          points: 2
        },
        {
          name: 'Calm Heart',
          points: 1
        }
      ],
      flaws: []
    }
  });

  deepFreeze(state);

  const result = getMeritsOptions(state);

  expect(result.has('Ambidextrous')).toBeFalsy();
  expect(result.has('Calm Heart')).toBeFalsy();
  expect(result.get('Acute Sense')).toEqual({ points: 1 });
  expect(result.get('Additional Uncommon Discipline')).toEqual({ points: 5 });
  expect(result.get('Whisper of Life')).toEqual({ points: 1 });
  expect(result.get('Blood of the Tzimisce')).toEqual({ points: 1 });
  expect(result.get('Szlachta')).toEqual({ points: 2 });
  expect(result.has('Sophistry')).toBeFalsy();
});

it('should return correct map for merit options when no clan selected', () => {
  const state = createMockRootState({
    setting: {
      name: 'Other'
    },
    character: {
      basicInfo: {
        clan: { name: '' }
      },
      merits: [
        {
          name: 'Ambidextrous',
          points: 2
        },
        {
          name: 'Calm Heart',
          points: 1
        }
      ],
      flaws: []
    }
  });

  deepFreeze(state);

  const result = getMeritsOptions(state);

  expect(result.has('Ambidextrous')).toBeFalsy();
  expect(result.has('Calm Heart')).toBeFalsy();
  expect(result.get('Acute Sense')).toEqual({ points: 1 });
  expect(result.get('Additional Uncommon Discipline')).toEqual({ points: 5 });
  expect(result.get('Whisper of Life')).toEqual({ points: 1 });
  expect(result.has('Blood of the Tzimisce')).toBeFalsy();
  expect(result.get('Szlachta')).toBeFalsy();
  expect(result.has('Sophistry')).toBeFalsy();
});

it('should return correct map for merit options when setting selected', () => {
  const state = createMockRootState({
    setting: {
      name: 'Sabbat'
    },
    character: {
      basicInfo: {
        clan: { name: '' }
      },
      merits: [
        {
          name: 'Ambidextrous',
          points: 2
        }
      ],
      flaws: []
    }
  });

  deepFreeze(state);

  const result = getMeritsOptions(state);

  expect(result.has('Ambidextrous')).toBeFalsy();
  expect(result.get('Acute Sense')).toEqual({ points: 1 });
  expect(result.get('Black Hand Membership')).toEqual({ points: 2 });
  expect(result.get('Fanatic')).toEqual({ points: 2 });
  expect(result.has('Emissary to the Camarilla')).toBeFalsy();
});

it('should return correct map for merit options when setting and clan selected', () => {
  const state = createMockRootState({
    setting: {
      name: 'Sabbat'
    },
    character: {
      basicInfo: {
        clan: { name: 'Tzimisce' }
      },
      merits: [
        {
          name: 'Ambidextrous',
          points: 2
        },
        {
          name: 'Executioner',
          points: 1
        },
        {
          name: 'Szlachta',
          points: 2
        }
      ],
      flaws: []
    }
  });

  deepFreeze(state);

  const result = getMeritsOptions(state);

  expect(result.has('Ambidextrous')).toBeFalsy();
  expect(result.has('Executioner')).toBeFalsy();
  expect(result.has('Szlachta')).toBeFalsy();
  expect(result.get('Acute Sense')).toEqual({ points: 1 });
  expect(result.get('Blood of the Tzimisce')).toEqual({ points: 1 });
  expect(result.get('Black Hand Membership')).toEqual({ points: 2 });
  expect(result.get('Fanatic')).toEqual({ points: 2 });
  expect(result.has('Emissary to the Camarilla')).toBeFalsy();
});

it('should not remove selected merit if multiple permitted', () => {
  const state = createMockRootState({
    setting: {
      name: 'Other'
    },
    character: {
      basicInfo: {
        clan: { name: '' }
      },
      merits: [
        {
          name: 'Skill Aptitude',
          points: 2
        }
      ],
      flaws: []
    }
  });

  deepFreeze(state);

  const result = getMeritsOptions(state);

  expect(result.get('Skill Aptitude')).toEqual({ points: 2, multiple: true });
  expect(result.get('Acute Sense')).not.toHaveProperty('multiple');
});
