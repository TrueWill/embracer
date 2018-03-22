import { arrayToMap } from '../utils/mapUtils';

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

export const commonDisciplineNames = [
  'Animalism',
  'Auspex',
  'Celerity',
  'Dominate',
  'Fortitude',
  'Obfuscate',
  'Potence',
  'Presence'
];

// TODO working
export const clans = arrayToMap([
  [
    'Assamite',
    {
      disciplines: ['Celerity', 'Obfuscate', 'Quietus'],
      bloodlines: arrayToMap([
        ['Vizier', { meritPoints: 2 }],
        ['Sorcerer', { meritPoints: 4 }]
      ])
    }
  ],
  [
    'Brujah',
    {
      disciplines: ['Celerity', 'Potence', 'Presence'],
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Followers of Set',
    {
      disciplines: ['Obfuscate', 'Presence', 'Serpentis'],
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Gangrel',
    {
      disciplines: ['Animalism', 'Fortitude', 'Protean'],
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Giovanni',
    {
      disciplines: ['Dominate', 'Potence', 'Necromancy: Sepulchre Path'],
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Lasombra',
    {
      disciplines: ['Dominate', 'Potence', 'Obtenebration'],
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Malkavian',
    {
      disciplines: ['Auspex', 'Dementation', 'Obfuscate'],
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Nosferatu',
    {
      disciplines: ['Animalism', 'Obfuscate', 'Potence'],
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Toreador',
    {
      disciplines: ['Auspex', 'Celerity', 'Presence'],
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Tremere',
    {
      disciplines: ['Auspex', 'Dominate', 'Thaumaturgy: Path of Blood'],
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Tzimisce',
    {
      disciplines: ['Animalism', 'Auspex', 'Vicissitude'],
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Ventrue',
    {
      disciplines: ['Dominate', 'Fortitude', 'Presence'],
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Caitiff',
    {
      disciplines: commonDisciplineNames,
      bloodlines: arrayToMap([])
    }
  ]
]);

export const caitiffInClanDisciplineCount = 3;

export const inClanDisciplinesAvailableStartingDots = [
  { dots: 2, count: 1 },
  { dots: 1, count: 2 }
];

export const outOfClanDisciplinesAvailableStartingDots = [];

export const attributeTraitNames = ['physical', 'social', 'mental'];

export const attributeMaxDots = 10;

export const attributesRankDots = [7, 5, 3];

export const foci = {
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
  'science',
  'security',
  'stealth',
  'streetwise',
  'subterfuge',
  'survival'
];

export const skillTraitDisplayNameOverride = {
  animalKen: 'Animal Ken'
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

export const initialXP = 30;
export const bankedXPLimit = 5;
export const outOfClanDisciplineLevelLimit = 3;

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
