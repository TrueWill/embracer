import { createStore, applyMiddleware, compose } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import rootReducer from '../reducers';
import type { RootState } from '../reducers';
import type { AllActions } from '../types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState?: Partial<RootState>) =>
  createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

export default configureStore;
export type AppDispatch = ThunkDispatch<RootState, unknown, AllActions>;
