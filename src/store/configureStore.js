import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from '../reducers';

export default (initialState) => createStore(rootReducer, initialState, devToolsEnhancer());
