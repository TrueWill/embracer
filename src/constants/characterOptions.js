export const archetypes = [
  'Architect',
  'Artist',
  'Bully',
  'Caregiver',
  'Child',
  'Competitor',
  'Con Artist',
  'Conformist',
  'Curious',
  'Curmudgeon',
  'Cultured',
  'Enigma',
  'Fanatic',
  'Fighter',
  'Freak',
  'Free Spirit',
  'Judge',
  'Know-It-All',
  'Introvert',
  'Leader',
  'Loner',
  'Loose Cannon',
  'Martyr',
  'Mediator',
  'Mercenary',
  'Monster',
  'Penitent',
  'Protector',
  'Rationalist',
  'Royalty',
  'Survivor',
  'Type-A Personality',
  'Teacher',
  'Traditionalist',
  'Troublemaker',
  'Toady',
  'Trickster',
  'Unflappable',
  'Untrustworthy'
];

export const attributeTraitNames = ['physical', 'social', 'mental'];

export const attributeMaxDots = 10;
export const bonusAttributeMaxDots = 5;

export const attributesRankDots = [7, 5, 3];

export const standardFoci = {
  physical: ['Strength', 'Dexterity', 'Stamina'],
  social: ['Charisma', 'Manipulation', 'Appearance'],
  mental: ['Perception', 'Intelligence', 'Wits']
};

export const standardTraitMaxDots = 5;

export const skillTraitNames = [
  'academics',
  'animalKen',
  'athletics',
  'awareness',
  'brawl',
  'computer',
  'crafts',
  'crafts2',
  'crafts3',
  'dodge',
  'drive',
  'empathy',
  'firearms',
  'intimidation',
  'investigation',
  'leadership',
  'linguistics',
  'lore',
  'medicine',
  'melee',
  'occult',
  'performance',
  'performance2',
  'performance3',
  'science',
  'science2',
  'science3',
  'security',
  'stealth',
  'streetwise',
  'subterfuge',
  'survival'
];

export const skillTraitDisplayNameOverride = {
  animalKen: 'Animal Ken',
  crafts2: 'Crafts (2nd field)',
  crafts3: 'Crafts (3rd field)',
  performance2: 'Performance (2nd field)',
  performance3: 'Performance (3rd field)',
  science2: 'Science (2nd field)',
  science3: 'Science (3rd field)'
};

export const skillsAvailableStartingDots = [
  { dots: 4, count: 1 },
  { dots: 3, count: 2 },
  { dots: 2, count: 3 },
  { dots: 1, count: 4 }
];

export const backgroundTraitNames = [
  'allies',
  'alternateIdentity',
  'contacts',
  'fame',
  'generation',
  'haven',
  'herd',
  'influence_elite',
  'influence_underworld',
  'resources',
  'retainers'
];

export const backgroundTraitDisplayNameOverride = {
  alternateIdentity: 'Alternate Identity',
  influence_elite: 'Influence (Elite)',
  influence_underworld: 'Influence (Underworld)'
};

export const backgroundsAvailableStartingDots = [
  { dots: 3, count: 1 },
  { dots: 2, count: 1 },
  { dots: 1, count: 1 }
];

export const humanity = 'Humanity';
export const moralityStartingDotsHumanity = 5;
export const moralityMaxDotsHumanity = 6;
export const moralityStartingDotsPath = 4;
export const moralityMaxDotsPath = 4;

export const startingWillpower = 6;

export const initialXP = 30;
export const bankedXPLimit = 5;

const standardDotCost = {
  attributes: {
    xp: 3,
    per: 'each'
  },
  backgrounds: {
    xp: 2,
    per: 'newLevel'
  },
  skills: {
    xp: 2,
    per: 'newLevel'
  },
  disciplines: {
    inClan: {
      xp: 3,
      per: 'newLevel'
    },
    outOfClan: {
      xp: 4,
      per: 'newLevel'
    }
  },
  rituals: {
    xp: 2,
    per: 'level'
  },
  morality: {
    xp: 10,
    per: 'each'
  }
};

export const generationChart = {
  1: {
    title: 'Neonate',
    bloodPool: 10,
    bloodPerTurn: 1,
    attributeBonus: 1,
    dotCost: {
      ...standardDotCost,
      backgrounds: {
        xp: 1,
        per: 'newLevel'
      },
      skills: {
        xp: 1,
        per: 'newLevel'
      }
    }
  },
  2: {
    title: 'Ancilla',
    bloodPool: 12,
    bloodPerTurn: 2,
    attributeBonus: 2,
    dotCost: standardDotCost
  },
  3: {
    title: 'Pretender Elder',
    bloodPool: 15,
    bloodPerTurn: 3,
    attributeBonus: 3,
    dotCost: standardDotCost
  },
  4: {
    title: 'Master Elder',
    bloodPool: 20,
    bloodPerTurn: 4,
    attributeBonus: 4,
    dotCost: standardDotCost
  },
  5: {
    title: 'Luminary Elder',
    bloodPool: 30,
    bloodPerTurn: 5,
    attributeBonus: 5,
    dotCost: {
      ...standardDotCost,
      disciplines: {
        inClan: standardDotCost.disciplines.inClan,
        outOfClan: {
          xp: 5,
          per: 'newLevel'
        }
      }
    }
  }
};
