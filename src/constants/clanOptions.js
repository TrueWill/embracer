import { arrayToMap } from '../utils/mapUtils';

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

export const clans = arrayToMap([
  [
    'Assamite',
    {
      disciplines: ['Celerity', 'Obfuscate', 'Quietus'],
      merits: [
        {
          name: 'Surprise Attack',
          points: 1
        },
        {
          name: 'Awakening the Steel',
          points: 3
        }
      ],
      bloodlines: arrayToMap([
        [
          'Vizier',
          { meritPoints: 2, disciplines: ['Auspex', 'Celerity', 'Quietus'] }
        ],
        [
          'Sorcerer',
          {
            meritPoints: 4,
            disciplines: ['Obfuscate', 'Quietus', 'Thaumaturgy: Lure of Flames']
          }
        ]
      ])
    }
  ],
  [
    'Brujah',
    {
      disciplines: ['Celerity', 'Potence', 'Presence'],
      merits: [
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
      bloodlines: arrayToMap([
        [
          'True Brujah',
          { meritPoints: 4, disciplines: ['Potence', 'Presence', 'Temporis'] }
        ]
      ])
    }
  ],
  [
    'Followers of Set',
    {
      disciplines: ['Obfuscate', 'Presence', 'Serpentis'],
      merits: [
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
      bloodlines: arrayToMap([
        [
          'Tlacique',
          { meritPoints: 2, disciplines: ['Presence', 'Obfuscate', 'Protean'] }
        ],
        [
          'Viper',
          {
            meritPoints: 2,
            disciplines: ['Potence', 'Presence', 'Serpentis']
          }
        ]
      ])
    }
  ],
  [
    'Gangrel',
    {
      disciplines: ['Animalism', 'Fortitude', 'Protean'],
      merits: [
        {
          name: 'Protean Blood',
          points: 1
        },
        {
          name: "Shape of Beast's Wrath",
          points: 3
        }
      ],
      bloodlines: arrayToMap([
        [
          'Coyote',
          { meritPoints: 2, disciplines: ['Celerity', 'Obfuscate', 'Protean'] }
        ],
        [
          'Noiad',
          {
            meritPoints: 2,
            disciplines: ['Animalism', 'Auspex', 'Protean']
          }
        ],
        [
          'Ahrimanes',
          {
            meritPoints: 4,
            disciplines: [
              'Animalism',
              'Presence',
              'Thaumaturgy: Path of Elemental Mastery'
            ]
          }
        ]
      ])
    }
  ],
  [
    'Giovanni',
    {
      disciplines: ['Dominate', 'Potence', 'Necromancy: Sepulchre Path'],
      merits: [
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
      bloodlines: arrayToMap([
        [
          'Premascine',
          {
            meritPoints: 4,
            disciplines: ['Dominate', 'Potence', 'Necromancy: Sepulchre Path']
          }
        ]
      ])
    }
  ],
  [
    'Lasombra',
    {
      disciplines: ['Dominate', 'Potence', 'Obtenebration'],
      merits: [
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
      bloodlines: arrayToMap([
        [
          'Kiasyd',
          {
            meritPoints: 4,
            disciplines: ['Dominate', 'Mytherceria', 'Obtenebration']
          }
        ]
      ])
    }
  ],
  [
    'Malkavian',
    {
      disciplines: ['Auspex', 'Dementation', 'Obfuscate'],
      merits: [
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
      bloodlines: arrayToMap([
        [
          'Ananke',
          { meritPoints: 2, disciplines: ['Auspex', 'Dementation', 'Presence'] }
        ],
        [
          'Knights of the Moon',
          {
            meritPoints: 2,
            disciplines: ['Auspex', 'Dominate', 'Obfuscate']
          }
        ]
      ])
    }
  ],
  [
    'Nosferatu',
    {
      disciplines: ['Animalism', 'Obfuscate', 'Potence'],
      merits: [
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
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Toreador',
    {
      disciplines: ['Auspex', 'Celerity', 'Presence'],
      merits: [
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
      bloodlines: arrayToMap([
        [
          'Ishtarri',
          { meritPoints: 2, disciplines: ['Celerity', 'Fortitude', 'Presence'] }
        ],
        [
          'Volgirre',
          {
            meritPoints: 2,
            disciplines: ['Auspex', 'Celerity', 'Presence']
          }
        ]
      ])
    }
  ],
  [
    'Tremere',
    {
      disciplines: ['Auspex', 'Dominate', 'Thaumaturgy: Path of Blood'],
      merits: [
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
      bloodlines: arrayToMap([
        [
          'Telyav',
          {
            meritPoints: 2,
            disciplines: ['Auspex', 'Presence', 'Thaumaturgy: Path of Blood']
          }
        ]
      ])
    }
  ],
  [
    'Tzimisce',
    {
      disciplines: ['Animalism', 'Auspex', 'Vicissitude'],
      merits: [
        {
          name: 'Blood of the Tzimisce',
          points: 1
        },
        {
          name: 'Szlachta',
          points: 2
        }
      ],
      bloodlines: arrayToMap([
        [
          'Carpathian',
          { meritPoints: 3, disciplines: ['Animalism', 'Auspex', 'Dominate'] }
        ],
        [
          'Koldun',
          {
            meritPoints: 4,
            disciplines: [
              'Animalism',
              'Auspex',
              'Thaumaturgy: Path of Elemental Mastery'
            ]
          }
        ]
      ])
    }
  ],
  [
    'Ventrue',
    {
      disciplines: ['Dominate', 'Fortitude', 'Presence'],
      merits: [
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
      bloodlines: arrayToMap([
        [
          'Crusader',
          { meritPoints: 2, disciplines: ['Auspex', 'Dominate', 'Fortitude'] }
        ]
      ])
    }
  ],
  [
    'Caitiff',
    {
      disciplines: commonDisciplineNames,
      merits: [
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
      ],
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Baali',
    {
      disciplines: ['Daimoinon', 'Obfuscate', 'Presence'],
      merits: [
        {
          name: 'Infernal Heritage',
          points: 1
        }
      ],
      bloodlines: arrayToMap([
        [
          'Angellis Ater',
          {
            meritPoints: 3,
            disciplines: [
              'Daimoinon',
              'Dominate',
              'Potence',
              'Presence',
              'Obfuscate'
            ]
          }
        ]
      ])
    }
  ],
  [
    'Cappadocians',
    {
      disciplines: ['Auspex', 'Fortitude', 'Necromancy: Mortis Path'],
      merits: [
        {
          name: 'Necromantic Insight',
          points: 1
        },
        {
          name: 'Pierced Shroud',
          points: 3
        }
      ],
      bloodlines: arrayToMap([
        [
          'Samedi',
          {
            meritPoints: 2,
            disciplines: ['Fortitude', 'Obfuscate', 'Thanatosis']
          }
        ],
        [
          'Lamia',
          {
            meritPoints: 4,
            disciplines: ['Fortitude', 'Necromancy: Mortis Path', 'Potence']
          }
        ]
      ])
    }
  ],
  [
    'Ravnos',
    {
      disciplines: ['Animalism', 'Fortitude', 'Chimeristry'],
      merits: [
        {
          name: 'Waking Dream',
          points: 1
        },
        {
          name: 'Escape Artist',
          points: 3
        }
      ],
      bloodlines: arrayToMap([
        [
          'Brahman',
          {
            meritPoints: 2,
            disciplines: ['Animalism', 'Auspex', 'Chimeristry']
          }
        ]
      ])
    }
  ],
  [
    'Salubri',
    {
      disciplines: ['Auspex', 'Fortitude', 'Valeren'],
      merits: [
        {
          name: 'Righteous Fury',
          points: 1
        },
        {
          name: 'Spiritual Armor',
          points: 2
        }
      ],
      bloodlines: arrayToMap([
        [
          'Healer',
          { meritPoints: 3, disciplines: ['Auspex', 'Fortitude', 'Obeah'] }
        ]
      ])
    }
  ],
  [
    'Daughters of Cacophony',
    {
      disciplines: ['Fortitude', 'Melpominee', 'Presence'],
      merits: [
        {
          name: 'Supernatural Aria',
          points: 1
        },
        {
          name: 'Soaring Octaves',
          points: 3
        }
      ],
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Gargoyles',
    {
      disciplines: ['Fortitude', 'Potence', 'Visceratika'],
      merits: [
        {
          name: 'Flight',
          points: 1
        },
        {
          name: 'Dark Statue',
          points: 3
        }
      ],
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

export const outOfClanDisciplineLevelLimit = 3;
