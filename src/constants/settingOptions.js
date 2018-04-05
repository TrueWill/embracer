import { arrayToMap } from '../utils/mapUtils';

export const settings = arrayToMap([
  [
    'Camarilla',
    {
      merits: [],
      flaws: []
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
        } // TODO: p. 453
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
      ]
    }
  ],
  [
    'Anarch Movement',
    {
      merits: [],
      flaws: []
    }
  ],
  [
    'Other',
    {
      merits: [],
      flaws: []
    }
  ]
]);
