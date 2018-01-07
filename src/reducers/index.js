import { combineReducers } from 'redux';
import basicInfo from './basicInfoReducer';
import attributes from './attributesReducer';
import skills from './skillsReducer';
import backgrounds from './backgroundsReducer';
import disciplines from './disciplinesReducer';

const rootReducer = combineReducers({
  character: combineReducers({
    basicInfo,
    attributes,
    skills,
    backgrounds,
    disciplines
  })
});

export default rootReducer;
