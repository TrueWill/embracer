import { combineReducers } from 'redux';
import basicInfo from './basicInfoReducer';
import attributes from './attributesReducer';
import skills from './skillsReducer';
import backgrounds from './backgroundsReducer';
import disciplines from './disciplinesReducer';
import meritsFlaws from './meritsFlawsReducer';

const rootReducer = combineReducers({
  character: combineReducers({
    basicInfo,
    attributes,
    skills,
    backgrounds,
    disciplines,
    meritsFlaws
  })
});

export default rootReducer;
