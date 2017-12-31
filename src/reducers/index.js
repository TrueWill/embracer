import { combineReducers } from 'redux';
import basicInfo from './basicInfoReducer';
import attributes from './attributesReducer';
import skills from './skillsReducer';

const rootReducer = combineReducers({
  character: combineReducers({
    basicInfo,
    attributes,
    skills
  })
});

export default rootReducer;
