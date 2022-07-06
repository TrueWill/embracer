export interface DotsCount {
  readonly dots: number;
  readonly count: number;
}

export type Unit = 'each' | 'level' | 'newLevel';

export interface Cost {
  readonly xp: number;
  readonly per: Unit;
}

export type DotCost = Readonly<{
  attributes: Cost;
  backgrounds: Cost;
  skills: Cost;
  disciplines: {
    readonly inClan: Cost;
    readonly outOfClan: Cost;
  };
  rituals: Cost;
  morality: Cost;
}>;

export type Generation = Readonly<{
  title: string;
  bloodPool: number;
  bloodPerTurn: number;
  attributeBonus: number;
  dotCost: DotCost;
}>;

export interface StandardMeritFlaw {
  readonly name: string;
  readonly points: number;
  readonly multiple?: boolean;
}

export interface MoralityMerit {
  readonly name: string;
  readonly clanAffinity?: string;
}

export interface BaseAction {
  type: string;
}

// This and base interface are from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/redux-actions/index.d.ts
export interface Action<Payload> extends BaseAction {
  payload: Payload;
  error?: boolean | undefined;
}

export interface ClanSetting {
  readonly name: string;
  readonly bloodline?: string;
  readonly meritPoints?: number;
}

export interface RankSetting {
  readonly category: 'attributes' | 'skills';
  readonly trait: string;
  readonly dotsFromRank: number;
}

export interface StartingDotsSetting {
  readonly category: string;
  readonly trait: string;
  readonly startingDots: number;
}

export interface FocusSetting {
  readonly attribute: string;
  readonly focus: string;
}

export interface DotLocation {
  readonly category: string;
  readonly trait: string;
}

export interface MoralitySetting {
  readonly path: string;
  readonly meritPoints: number;
}

export interface RitualsSetting {
  readonly ritualType: string;
  readonly rituals: number[];
}

export interface TraitState {
  dotsFromRank?: number;
  startingDots?: number;
  dotsPurchased?: number;
}
