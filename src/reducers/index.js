import { combineReducers } from 'redux';
import basicInfo from './basicInfoReducer';
import attributes from './attributesReducer';

const rootReducer = combineReducers({
  character: combineReducers({
    basicInfo,
    attributes
  })
});

export default rootReducer;
