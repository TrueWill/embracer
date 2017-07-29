import { combineReducers } from 'redux';
import characterCreation from './characterCreationReducer';

const rootReducer = combineReducers({
  character: characterCreation
});

export default rootReducer;
