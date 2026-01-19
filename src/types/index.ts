// Base type definitions for Embracer character sheet generator
// This file contains shared TypeScript types for Redux state, actions, and components

import * as types from '../constants/actionTypes';

// ============================================================================
// Common Types
// ============================================================================

export interface AvailableStartingDot {
  dots: number;
  count: number;
}

export interface DotCostInfo {
  xp: number;
  per: 'each' | 'newLevel' | 'level';
}

export interface DisciplineDotCost {
  inClan: DotCostInfo;
  outOfClan: DotCostInfo;
}

export interface GenerationDotCost {
  attributes: DotCostInfo;
  backgrounds: DotCostInfo;
  skills: DotCostInfo;
  disciplines: DisciplineDotCost;
  rituals: DotCostInfo;
  morality: DotCostInfo;
}

export interface GenerationInfo {
  title: string;
  bloodPool: number;
  bloodPerTurn: number;
  attributeBonus: number;
  dotCost: GenerationDotCost;
}

// ============================================================================
// Trait Types
// ============================================================================

export interface TraitState {
  dotsFromRank?: number;
  startingDots?: number;
  dotsPurchased?: number;
  focus?: string;
}

export interface TraitMap {
  [traitName: string]: TraitState;
}

// ============================================================================
// Character Types
// ============================================================================

export interface ClanInfo {
  name: string;
  bloodline?: string;
  meritPoints?: number;
}

export interface BasicInfo {
  archetype: string;
  clan: ClanInfo;
}

export interface AttributesState extends TraitMap {
  physical: TraitState;
  social: TraitState;
  mental: TraitState;
}

export interface SkillsState {
  [traitName: string]: TraitState | AvailableStartingDot[];
  availableStartingDots: AvailableStartingDot[];
}

export interface BackgroundsState {
  [traitName: string]: TraitState | AvailableStartingDot[];
  availableStartingDots: AvailableStartingDot[];
}

export interface DisciplineCategory {
  availableStartingDots: AvailableStartingDot[];
  [disciplineName: string]: TraitState | AvailableStartingDot[];
}

export interface RitualsState {
  necromantic: string[];
  thaumaturgic: string[];
}

export interface DisciplinesState {
  inClan: DisciplineCategory;
  outOfClan: DisciplineCategory;
  rituals: RitualsState;
}

export interface MeritFlawItem {
  name: string;
  points: number;
  timesPurchased?: number;
}

export interface MoralityState {
  path: string;
  startingDots: number;
  dotsPurchased?: number;
  meritPoints?: number;
}

export interface CharacterState {
  basicInfo: BasicInfo;
  attributes: AttributesState;
  skills: SkillsState;
  backgrounds: BackgroundsState;
  disciplines: DisciplinesState;
  merits: MeritFlawItem[];
  flaws: MeritFlawItem[];
  morality: MoralityState;
}

// ============================================================================
// Redux State Types
// ============================================================================

export interface ModeState {
  isEraser: boolean;
}

export interface SettingState {
  name: string;
}

// RootState is now defined in /src/reducers/index.ts and exported from there
// We'll import and re-export it here for convenience
export type { RootState } from '../reducers';

// ============================================================================
// Component Prop Types
// ============================================================================

export interface RankedTraitProps {
  name: string;
  displayName?: string;
  maxDots: number;
  rankDots: number[];
  traitState: TraitState;
  onRankChange: (name: string, dotsFromRank: number) => void;
  onClick: (name: string) => void;
}

export interface DotsProps {
  level: number;
  max: number;
  onClick: () => void;
}

export interface RankProps {
  dots: number[];
  dotValue?: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface ClanProps {
  clan: ClanInfo;
  updateClan: (name: string, bloodline?: string, meritPoints?: number) => void;
}

export interface MeritsProps {
  optionsMap: Map<string, { points: number; multiple?: boolean }>;
  selected: MeritFlawItem[];
  availablePoints: number;
  addMerit: (name: string, points: number) => void;
  removeMerit: (name: string) => void;
}

export interface FlawsProps {
  optionsMap: Map<string, { points: number; multiple?: boolean }>;
  selected: MeritFlawItem[];
  addFlaw: (name: string, points: number) => void;
  removeFlaw: (name: string) => void;
}

export interface DeleteButtonProps {
  id: string;
  onClick: (id: string) => void;
}

export interface SectionProps {
  header: string;
  children: React.ReactNode;
}

// ============================================================================
// Selector Return Types
// ============================================================================

export interface MeritsInfo {
  selected: MeritFlawItem[];
  currentPoints: number;
  availablePoints: number;
}

export interface FlawsInfo {
  selected: MeritFlawItem[];
  currentPoints: number;
}

export interface ValidationError {
  category: string;
  message: string;
}

// ============================================================================
// Action Types
// ============================================================================

// Basic Info Actions
export interface UpdateArchetypeAction {
  type: typeof types.UPDATE_ARCHETYPE;
  payload: string;
}

export interface UpdateClanAction {
  type: typeof types.UPDATE_CLAN;
  payload: {
    name: string;
    bloodline?: string;
    meritPoints?: number;
  };
}

// Trait Actions
export interface SetRankAction {
  type: typeof types.SET_RANK;
  payload: {
    category: string;
    trait: string;
    dotsFromRank: number;
  };
}

export interface SetStartingDotsAction {
  type: typeof types.SET_STARTING_DOTS;
  payload: {
    category: string;
    trait: string;
    startingDots: number;
  };
}

export interface SetFocusAction {
  type: typeof types.SET_FOCUS;
  payload: {
    attribute: string;
    focus: string;
  };
}

// Merit and Flaw Actions
export interface AddMeritAction {
  type: typeof types.ADD_MERIT;
  payload: {
    name: string;
    points: number;
  };
}

export interface RemoveMeritAction {
  type: typeof types.REMOVE_MERIT;
  payload: {
    name: string;
  };
}

export interface AddFlawAction {
  type: typeof types.ADD_FLAW;
  payload: {
    name: string;
    points: number;
  };
}

export interface RemoveFlawAction {
  type: typeof types.REMOVE_FLAW;
  payload: {
    name: string;
  };
}

// Dot Purchase Actions
export interface PurchaseDotAction {
  type: typeof types.PURCHASE_DOT;
  payload: {
    category: string;
    trait: string;
  };
}

export interface UnpurchaseDotAction {
  type: typeof types.UNPURCHASE_DOT;
  payload: {
    category: string;
    trait: string;
  };
}

export interface PurchaseMoralityDotAction {
  type: typeof types.PURCHASE_MORALITY_DOT;
}

export interface UnpurchaseMoralityDotAction {
  type: typeof types.UNPURCHASE_MORALITY_DOT;
}

// Mode Actions
export interface TogglePencilEraserModeAction {
  type: typeof types.TOGGLE_PENCIL_ERASER_MODE;
}

// Morality Actions
export interface UpdateMoralityAction {
  type: typeof types.UPDATE_MORALITY;
  payload: {
    path: string;
    meritPoints: number;
  };
}

// Setting Actions
export interface UpdateSettingAction {
  type: typeof types.UPDATE_SETTING;
  payload: {
    name: string;
  };
}

// Rituals Actions
export interface UpdateRitualsAction {
  type: typeof types.UPDATE_RITUALS;
  payload: {
    ritualType: string;
    rituals: string[];
  };
}

// Union of all character actions
export type CharacterAction =
  | UpdateArchetypeAction
  | UpdateClanAction
  | SetRankAction
  | SetStartingDotsAction
  | SetFocusAction
  | AddMeritAction
  | RemoveMeritAction
  | AddFlawAction
  | RemoveFlawAction
  | PurchaseDotAction
  | UnpurchaseDotAction
  | PurchaseMoralityDotAction
  | UnpurchaseMoralityDotAction
  | TogglePencilEraserModeAction
  | UpdateMoralityAction
  | UpdateSettingAction
  | UpdateRitualsAction;

// Union of all actions (same as CharacterAction for now)
export type AllActions = CharacterAction;

// AppDispatch is now defined in /src/store/configureStore.ts and exported from there
// We'll import and re-export it here for convenience
export type { AppDispatch } from '../store/configureStore';
