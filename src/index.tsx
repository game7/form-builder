import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute,
         IndexRedirect, browserHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './app';
import { default as forms } from './forms';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/forms" />
      {forms}
    </Route>
  </Router>,
  document.getElementById('root')
);
