import initialState from './initialState';
import * as types from '../constants/actionTypes';
import type {
  MeritFlawItem,
  AddFlawAction,
  RemoveFlawAction,
  UpdateSettingAction
} from '../types';

type FlawsAction =
  | AddFlawAction
  | RemoveFlawAction
  | UpdateSettingAction;

const flawsReducer = (
  state: MeritFlawItem[] = initialState.character.flaws,
  action: FlawsAction
): MeritFlawItem[] => {
  switch (action.type) {
    case types.ADD_FLAW:
      const newState = state.slice();
      newState.push(action.payload);
      return newState;
    case types.REMOVE_FLAW:
      const { name } = action.payload;
      return state.filter(x => x.name !== name);
    case types.UPDATE_SETTING:
      // reset, as there are setting-specific flaws
      return initialState.character.flaws;
    default:
      return state;
  }
};

export default flawsReducer;
