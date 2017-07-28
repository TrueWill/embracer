import { combineReducers } from 'redux';
import characterCreation from './characterCreationReducer';

const rootReducer = combineReducers({
  characterCreation
});

export default rootReducer;
