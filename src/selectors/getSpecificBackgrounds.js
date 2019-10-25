import { createSelector } from 'reselect';
import { settings } from '../constants/settingOptions';
import { getSettingName } from './simple';

const getSpecificBackgrounds = createSelector(
  [getSettingName],
  settingName => settings.get(settingName).backgrounds
);

export default getSpecificBackgrounds;
