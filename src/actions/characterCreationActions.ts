import * as types from '../constants/actionTypes';
import { humanity } from '../constants/characterOptions';
import getMoralityMeritsOptions from '../selectors/getMoralityMeritsOptions';
import getDots from '../utils/getDots';
import getMerits from '../selectors/getMerits';
import {
  getIsEraserMode,
  getClanName,
  getGeneration,
  getMorality
} from '../selectors/simple';
import { IState } from '../reducers/initialState';
import { Action, AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface UpdateArchetypeAction extends Action<types.UPDATE_ARCHETYPE> {
  payload: string;
}

export const updateArchetype = (value: string): UpdateArchetypeAction => ({
  type: types.UPDATE_ARCHETYPE,
  payload: value
});

export interface UpdateClanAction extends Action<types.UPDATE_CLAN> {
  payload: {
    name: string;
    bloodline?: string;
    meritPoints?: number;
  };
}

export const updateClan = (
  name: string,
  bloodline?: string,
  meritPoints?: number
): UpdateClanAction => ({
  type: types.UPDATE_CLAN,
  payload: {
    name,
    bloodline,
    meritPoints
  }
});

export interface SetRankAction extends Action<types.SET_RANK> {
  payload: {
    category: string;
    trait: string;
    dotsFromRank: number;
  };
}

export const setRank = (
  category: string,
  trait: string,
  dotsFromRank: number
): SetRankAction => ({
  type: types.SET_RANK,
  payload: {
    category,
    trait,
    dotsFromRank
  }
});

export interface SetStartingDotsAction extends Action<types.SET_STARTING_DOTS> {
  payload: {
    category: string;
    trait: string;
    startingDots: number;
  };
}

export const setStartingDots = (
  category: string,
  trait: string,
  startingDots: number
): SetStartingDotsAction => ({
  type: types.SET_STARTING_DOTS,
  payload: {
    category,
    trait,
    startingDots
  }
});

export interface SetFocusAction extends Action<types.SET_FOCUS> {
  payload: {
    attribute: string;
    focus: string;
  };
}

export const setFocus = (attribute: string, focus: string): SetFocusAction => ({
  type: types.SET_FOCUS,
  payload: {
    attribute,
    focus
  }
});

export interface AddMeritAction extends Action<types.ADD_MERIT> {
  payload: {
    name: string;
    points: number;
  };
}

export const addMerit = (name: string, points: number): AddMeritAction => ({
  type: types.ADD_MERIT,
  payload: {
    name,
    points
  }
});

export interface RemoveMeritAction extends Action<types.REMOVE_MERIT> {
  payload: {
    name: string;
  };
}

export const removeMerit = (name: string): RemoveMeritAction => ({
  type: types.REMOVE_MERIT,
  payload: {
    name
  }
});

export interface AddFlawAction extends Action<types.ADD_FLAW> {
  payload: {
    name: string;
    points: number;
  };
}

export const addFlaw = (name: string, points: number): AddFlawAction => ({
  type: types.ADD_FLAW,
  payload: {
    name,
    points
  }
});

export interface RemoveFlawAction extends Action<types.REMOVE_FLAW> {
  payload: {
    name: string;
  };
}

export const removeFlaw = (name: string): RemoveFlawAction => ({
  type: types.REMOVE_FLAW,
  payload: {
    name
  }
});

export interface PurchaseDotAction extends Action<types.PURCHASE_DOT> {
  payload: {
    category: string;
    trait: string;
  };
}

export const purchaseDot = (
  category: string,
  trait: string
): PurchaseDotAction => ({
  type: types.PURCHASE_DOT,
  payload: {
    category,
    trait
  }
});

export interface UnpurchaseDotAction extends Action<types.UNPURCHASE_DOT> {
  payload: {
    category: string;
    trait: string;
  };
}

export const unpurchaseDot = (
  category: string,
  trait: string
): UnpurchaseDotAction => ({
  type: types.UNPURCHASE_DOT,
  payload: {
    category,
    trait
  }
});

export const purchaseOrUnpurchaseDot = (
  category: string,
  trait: string
): ThunkAction<void, IState, undefined, AnyAction> => (
  dispatch: Dispatch,
  getState: () => IState
) => {
  const state = getState();
  const isEraserMode = getIsEraserMode(state);

  if (
    category === 'backgrounds' &&
    trait === 'generation' &&
    !isEraserMode &&
    getClanName(state) === 'Caitiff' &&
    getDots(getGeneration(state)) >= 2
  ) {
    return;
  }

  const actionCreator = isEraserMode ? unpurchaseDot : purchaseDot;

  dispatch(actionCreator(category, trait));
};

export type PurchaseMoralityDotAction = Action<types.PURCHASE_MORALITY_DOT>;

export const purchaseMoralityDot = (): PurchaseMoralityDotAction => ({
  type: types.PURCHASE_MORALITY_DOT
});

export type UnpurchaseMoralityDotAction = Action<types.UNPURCHASE_MORALITY_DOT>;

export const unpurchaseMoralityDot = (): UnpurchaseMoralityDotAction => ({
  type: types.UNPURCHASE_MORALITY_DOT
});

export const purchaseOrUnpurchaseMoralityDot = (): ThunkAction<
  void,
  IState,
  undefined,
  AnyAction
> => (dispatch: Dispatch, getState: () => IState) => {
  const state = getState();

  const actionCreator = getIsEraserMode(state)
    ? unpurchaseMoralityDot
    : purchaseMoralityDot;

  dispatch(actionCreator());
};

export interface UpdateMoralityAction extends Action<types.UPDATE_MORALITY> {
  payload: {
    path: string;
    meritPoints: number;
  };
}

export const updateMorality = (
  path: string,
  meritPoints: number
): UpdateMoralityAction => ({
  type: types.UPDATE_MORALITY,
  payload: {
    path,
    meritPoints
  }
});

const getMeritPoints = (path: string, optionsMap: any): number =>
  path === humanity ? 0 : optionsMap.get(path).points;

export const updateMoralityIfPointsAvailable = (
  path: string
): ThunkAction<void, IState, undefined, AnyAction> => (
  dispatch: Dispatch,
  getState: () => IState
) => {
  const state = getState();
  const currentPath = getMorality(state).path;
  const optionsMap = getMoralityMeritsOptions(state);
  let { availablePoints } = getMerits(state);

  const newMeritPoints = getMeritPoints(path, optionsMap);
  const currentMeritPoints = getMeritPoints(currentPath, optionsMap);

  availablePoints += currentMeritPoints;

  if (newMeritPoints <= availablePoints) {
    dispatch(updateMorality(path, newMeritPoints));
  }
};
