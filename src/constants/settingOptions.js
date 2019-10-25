import { arrayToMap } from '../utils/mapUtils';

export const settings = arrayToMap([
  [
    'Camarilla',
    {
      merits: [
        {
          name: 'Antiquities',
          points: 1
        },
        {
          name: 'Architect of the Tower',
          points: 2
        },
        {
          name: 'Emissary to the Camarilla',
          points: 1
        },
        {
          name: 'Machiavellian Prodigy',
          points: 1
        },
        {
          name: 'Master of Puppets',
          points: 2
        },
        {
          name: 'Monopoly',
          points: 1
        },
        {
          name: 'Prestigious Sire',
          points: 1
        },
        {
          name: 'Social Nobility',
          points: 3
        }
      ],
      flaws: [
        {
          name: 'Accused of Heresy',
          points: 2
        },
        {
          name: 'Forgiven Diablerie',
          points: 1
        },
        {
          name: 'Sectarian',
          points: 2
        },
        {
          name: 'Tainted Embrace',
          points: 2
        },
        {
          name: 'Untrained Combatant',
          points: 3
        }
      ],
      backgrounds: []
    }
  ],
  [
    'Sabbat',
    {
      merits: [
        {
          name: 'Black Hand Membership',
          points: 2
        },
        {
          name: 'Executioner',
          points: 1
        },
        {
          name: 'Fanatic',
          points: 2
        },
        {
          name: 'Inquisition Membership',
          points: 2
        },
        {
          name: 'Keeper of a Sacred Text',
          points: 1
        },
        {
          name: 'Pack Player',
          points: 3
        },
        {
          name: 'Revelator',
          points: 3
        },
        {
          name: 'Sanctified',
          points: 1
        },
        {
          name: 'Scholar of the Sword',
          points: 1
        },
        {
          name: 'Volatile',
          points: 1
        },
        {
          name: 'Zealot',
          points: 1
        }
      ],
      flaws: [
        {
          name: 'Crisis of Faith',
          points: 2
        },
        {
          name: 'Mistrusted',
          points: 1
        },
        {
          name: 'Soul Shard',
          points: 3
        },
        {
          name: 'Tenuous Loyalty',
          points: 3
        }
      ],
      backgrounds: ['rituals']
    }
  ],
  [
    'Anarch Movement',
    {
      merits: [
        {
          name: 'Dauntless',
          points: 2
        },
        {
          name: 'Ear to the Ground',
          points: 1
        },
        {
          name: 'Elder of the Revolution',
          points: 2
        },
        {
          name: 'Lion of the Cause',
          points: 3
        },
        {
          name: 'Moniker',
          points: 1
        },
        {
          name: 'Moral Compass',
          points: 1
        },
        {
          name: 'Old Dog',
          points: 1
        },
        {
          name: 'Sorcerous Dabbler',
          points: 2
        },
        {
          name: 'Tech Junkie',
          points: 2
        },
        {
          name: 'Wild One',
          points: 1
        }
      ],
      flaws: [
        {
          name: 'Bastard Childe',
          points: 2
        },
        {
          name: 'Black Sheep',
          points: 2
        },
        {
          name: 'Dubious Loyalties',
          points: 2
        },
        {
          name: 'Escaped Shovelhead',
          points: 2
        },
        {
          name: 'Once Enslaved',
          points: 2
        }
      ],
      backgrounds: []
    }
  ],
  [
    'Other',
    {
      merits: [],
      flaws: [],
      backgrounds: []
    }
  ]
]);
