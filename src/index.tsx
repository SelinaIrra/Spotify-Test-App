import 'core-js/es';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './pages/App';
import Home from './pages/Home';
import Card from './pages/Card';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';

import 'normalize.css';
import './style/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/oauth">
          <App oauthConfirm />
        </Route>
        <Route path="/track/:id">
          <App>
            <Card />
          </App>
        </Route>
        <Route path="/">
          <App>
            <Home />
          </App>
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
