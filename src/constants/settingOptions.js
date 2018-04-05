import { arrayToMap } from '../utils/mapUtils';

export const settings = arrayToMap([
  [
    'Camarilla',
    {
      merits: []
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
      ]
    }
  ],
  [
    'Anarch Movement',
    {
      merits: []
    }
  ],
  [
    'Other',
    {
      merits: []
    }
  ]
]);
