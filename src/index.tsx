import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './styles/index.css';
import App from './components/App';

const store = configureStore();

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
