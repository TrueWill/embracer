import { combineReducers } from 'redux';
import mode from './modeReducer';
import basicInfo from './basicInfoReducer';
import attributes from './attributesReducer';
import skills from './skillsReducer';
import backgrounds from './backgroundsReducer';
import disciplines from './disciplinesReducer';
import merits from './meritsReducer';
import flaws from './flawsReducer';

const rootReducer = combineReducers({
  mode,
  character: combineReducers({
    basicInfo,
    attributes,
    skills,
    backgrounds,
    disciplines,
    merits,
    flaws
  })
});

export default rootReducer;
