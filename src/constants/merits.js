export const maxMeritPoints = 7;

// Excludes Clan-Specific and Morality Merits
export const merits = [
  {
    name: 'Acute Sense',
    points: 1
  },
  {
    name: 'Additional Common Discipline',
    points: 4
  },
  {
    name: 'Additional Uncommon Discipline',
    points: 5
  },
  {
    name: 'Ambidextrous',
    points: 2
  },
  {
    name: 'Arcane',
    points: 1
  },
  {
    name: 'Blas\u00e9',
    points: 3
  },
  {
    name: 'Calm Heart',
    points: 1
  },
  {
    name: 'Clear Sighted',
    points: 3
  },
  {
    name: 'Code of Honor',
    points: 2
  },
  {
    name: 'Daredevil',
    points: 2
  },
  {
    name: 'Efficient Digestion',
    points: 1
  },
  {
    name: 'Efficient Learner',
    points: 2
  },
  {
    name: 'Golconda Seeker',
    points: 5
  },
  {
    name: 'Infernal Power',
    points: 3
  },
  {
    name: 'Intense Vitality',
    points: 3
  },
  {
    name: 'Iron Will',
    points: 3
  },
  {
    name: 'Light Sleeper',
    points: 1
  },
  {
    name: 'Loremaster',
    points: 1
  },
  {
    name: 'Lucky',
    points: 2
  },
  {
    name: 'Magic Resistance',
    points: 3
  },
  {
    name: 'Medium',
    points: 1
  },
  {
    name: 'Natural Linguist',
    points: 1
  },
  {
    name: 'Necromantic Training',
    points: 5
  },
  {
    name: 'Oracular Ability',
    points: 2
  },
  {
    name: 'Personal Masquerade',
    points: 1
  },
  {
    name: 'Reputation',
    points: 2
  },
  {
    name: 'Rugged',
    points: 3
  },
  {
    name: 'Skill Aptitude',
    points: 2
  },
  {
    name: 'Slippery Customer',
    points: 2
  },
  {
    name: 'Thaumaturgic Training',
    points: 4
  },
  {
    name: 'Unbondable',
    points: 4
  },
  {
    name: 'Unyielding',
    points: 4
  },
  {
    name: 'Versatile',
    points: 3
  },
  {
    name: 'Whisper of Life',
    points: 1
  }
];

// Excludes Bloodline merits
export const clanSpecificMerits = {
  Assamite: [
    {
      name: 'Surprise Attack',
      points: 1
    },
    {
      name: 'Awakening the Steel',
      points: 3
    }
  ],
  Brujah: [
    {
      name: 'Brotherhood',
      points: 1
    },
    {
      name: 'Burning Wrath',
      points: 2
    },
    {
      name: 'Scourge of Alecto',
      points: 3
    }
  ],
  'Followers of Set': [
    {
      name: 'Personal Cult',
      points: 1
    },
    {
      name: 'Addictive Blood',
      points: 3
    },
    {
      name: 'Setite Sorcery',
      points: 4
    }
  ],
  Gangrel: [
    {
      name: 'Protean Blood',
      points: 1
    },
    {
      name: "Shape of Beast's Wrath",
      points: 3
    }
  ],
  Giovanni: [
    {
      name: 'Necromantic Expertise',
      points: 1
    },
    {
      name: 'Mook',
      points: 2
    },
    {
      name: 'Ghostly Retainer',
      points: 3
    }
  ],
  Lasombra: [
    {
      name: 'Angelic Visage',
      points: 1
    },
    {
      name: 'Born in Shadow',
      points: 2
    },
    {
      name: 'Walk the Abyss',
      points: 3
    }
  ],
  Malkavian: [
    {
      name: 'Expanded Consciousness',
      points: 1
    },
    {
      name: 'Labyrinthine Mind',
      points: 3
    },
    {
      name: 'Sophistry',
      points: 4
    }
  ],
  Nosferatu: [
    {
      name: 'Unseeing Eye',
      points: 1
    },
    {
      name: 'Hidden Advantage',
      points: 2
    },
    {
      name: 'Pliable Blood',
      points: 3
    },
    {
      name: 'Unnatural Adaptation',
      points: 4
    }
  ],
  Toreador: [
    {
      name: "Artist's Blessing",
      points: 1
    },
    {
      name: 'Absent Sway',
      points: 3
    },
    {
      name: "Dancer's Grace",
      points: 4
    }
  ],
  Tremere: [
    {
      name: 'Thaumaturgic Expertise',
      points: 1
    },
    {
      name: 'Talisman',
      points: 3
    },
    {
      name: 'Countermagic',
      points: 4
    }
  ],
  Tzimisce: [
    {
      name: 'Blood of the Tzimisce',
      points: 1
    },
    {
      name: 'Szlachta',
      points: 2
    }
  ],
  Ventrue: [
    {
      name: 'Aura of Command',
      points: 1
    },
    {
      name: 'Paragon',
      points: 3
    },
    {
      name: 'Regal Bearing',
      points: 4
    }
  ],
  Caitiff: [
    {
      name: 'Auspicious',
      points: 1
    },
    {
      name: 'Eclipsed Blood',
      points: 2
    },
    {
      name: 'Vestiges of Greatness',
      points: 3
    }
  ]
};

export const moralityMeritBasePoints = 3;
export const moralityMeritClanAffinityDiscount = 1;

export const moralityMerits = [
  {
    name: 'Path of Blood',
    clanAffinity: 'Assamite'
  },
  {
    name: 'Path of Caine'
  },
  {
    name: 'Path of Cathari'
  },
  {
    name: 'Path of Chivalry'
  },
  {
    name: 'Path of Death & the Soul',
    clanAffinity: 'Giovanni'
  },
  {
    name: 'Path of Ecstasy',
    clanAffinity: 'Followers of Set'
  },
  {
    name: 'Path of Evil Revelations'
  },
  {
    name: 'Path of Feral Heart'
  },
  {
    name: 'Path of Heaven'
  },
  {
    name: 'Path of Harmony'
  },
  {
    name: 'Path of Honorable Accord'
  },
  {
    name: 'Path of Lilith'
  },
  {
    name: 'Path of Metamorphosis',
    clanAffinity: 'Tzimisce'
  },
  {
    name: 'Path of Night',
    clanAffinity: 'Lasombra'
  },
  {
    name: 'Path of Orion'
  },
  {
    name: 'Path of Paradox',
    clanAffinity: 'Ravnos'
  },
  {
    name: 'Path of Power & the Inner Voice'
  },
  {
    name: 'Path of Scorched Heart'
  },
  {
    name: 'Path of Typhon-Set',
    clanAffinity: 'Viper'
  }
];
