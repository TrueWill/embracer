import deepFreeze from 'deep-freeze';
import getFlaws from './getFlaws';
import { createMockRootState } from '../test-utils/mockState';

it('should return correct values for flaws', () => {
  const state = createMockRootState({
    character: {
      merits: [
        {
          name: 'Calm Heart',
          points: 1
        }
      ],
      flaws: [
        {
          name: 'Bad Sight',
          points: 2
        },
        {
          name: 'Blood Rot',
          points: 5
        }
      ]
    }
  });

  deepFreeze(state);

  const result = getFlaws(state);

  expect(result).toEqual({
    selected: state.character.flaws,
    currentPoints: 7,
    availablePoints: 0
  });
});
