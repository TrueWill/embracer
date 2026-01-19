import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { removeProperty } from '../utils/objectUtils';
import type { MeritFlawItem } from '../types';

const meritsReducer = (
  state: MeritFlawItem[] = initialState.character.merits,
  action: any
): MeritFlawItem[] => {
  let name: string, newState: MeritFlawItem[];

  switch (action.type) {
    case types.ADD_MERIT:
      ({ name } = action.payload);
      let found = false;

      newState = state.map(x => {
        if (x.name === name) {
          found = true;
          const timesPurchased = (x.timesPurchased || 1) + 1;
          return { ...x, timesPurchased };
        }

        return x;
      });

      if (!found) {
        newState.push(action.payload);
      }

      return newState;
    case types.REMOVE_MERIT:
      ({ name } = action.payload);

      newState = [];

      state.forEach(x => {
        if (x.name === name) {
          const timesPurchased = (x.timesPurchased || 1) - 1;

          if (timesPurchased > 1) {
            newState.push({ ...x, timesPurchased });
          } else if (timesPurchased === 1) {
            newState.push(removeProperty(x, 'timesPurchased'));
          }
          // else exclude
        } else {
          newState.push(x);
        }
      });

      return newState;
    case types.UPDATE_SETTING:
      // reset, as there are setting-specific merits
      return initialState.character.merits;
    case types.UPDATE_CLAN:
      // reset, as there are clan-specific merits
      return initialState.character.merits;
    default:
      return state;
  }
};

export default meritsReducer;
