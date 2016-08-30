import * as React from 'react';
import { Router, Route, IndexRoute,
         IndexRedirect, browserHistory } from 'react-router';

import App from './app';
import { default as forms } from './forms';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/forms" />
      {forms}
    </Route>
  </Router>
);
