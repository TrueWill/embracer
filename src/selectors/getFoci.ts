import { createSelector } from 'reselect';
import { standardFoci } from '../constants/characterOptions';
import { getClanName } from './simple';

const getFoci = createSelector([getClanName], clanName => {
  return clanName === 'Nosferatu'
    ? {
        physical: standardFoci.physical,
        social: standardFoci.social.filter(focus => focus !== 'Appearance'),
        mental: standardFoci.mental
      }
    : standardFoci;
});

export default getFoci;
