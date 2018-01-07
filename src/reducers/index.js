import { combineReducers } from 'redux';
import basicInfo from './basicInfoReducer';
import attributes from './attributesReducer';
import skills from './skillsReducer';
import backgrounds from './backgroundsReducer';

const rootReducer = combineReducers({
  character: combineReducers({
    basicInfo,
    attributes,
    skills,
    backgrounds
  })
});

export default rootReducer;
