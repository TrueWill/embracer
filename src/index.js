import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from './store/configureStore';
import './styles/index.css';
import 'react-select/dist/react-select.css';
import App from './components/App';
import Attributes from './components/Attributes';
import Skills from './components/Skills';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <App />
        <Route exact path="/" component={Attributes}/>
        <Route path="/skills" component={Skills}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
