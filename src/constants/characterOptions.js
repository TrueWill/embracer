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

export const clans = [
  'Assamite',
  'Brujah',
  'Followers of Set',
  'Gangrel',
  'Giovanni',
  'Lasombra',
  'Malkavian',
  'Nosferatu',
  'Toreador',
  'Tremere',
  'Tzimisce',
  'Ventrue',
  'Caitiff'
];

export const caitiffInClanDisciplineCount = 3;

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

export const disciplineNamesByClan = {
  Assamite: ['Celerity', 'Obfuscate', 'Quietus'],
  Brujah: ['Celerity', 'Potence', 'Presence'],
  'Followers of Set': ['Obfuscate', 'Presence', 'Serpentis'],
  Gangrel: ['Animalism', 'Fortitude', 'Protean'],
  Giovanni: ['Dominate', 'Potence', 'Necromancy: Sepulchre Path'],
  Lasombra: ['Dominate', 'Potence', 'Obtenebration'],
  Malkavian: ['Auspex', 'Dementation', 'Obfuscate'],
  Nosferatu: ['Animalism', 'Obfuscate', 'Potence'],
  Toreador: ['Auspex', 'Celerity', 'Presence'],
  Tremere: ['Auspex', 'Dominate', 'Thaumaturgy: Path of Blood'],
  Tzimisce: ['Animalism', 'Auspex', 'Vicissitude'],
  Ventrue: ['Dominate', 'Fortitude', 'Presence'],
  Caitiff: commonDisciplineNames
};

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
