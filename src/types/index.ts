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
