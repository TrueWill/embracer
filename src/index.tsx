import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './styles/index.css';
import App from './components/App';

const store = configureStore();

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // @ts-ignore - React 18 types incompatibility with react-redux Provider
  <Provider store={store}>
    <App />
  </Provider>
);
