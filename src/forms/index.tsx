import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import List from './list';
import Show from './show';

class Layout extends React.Component<any, any> {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const routes = (
  <Route path="forms" component={Layout}>
    <IndexRoute component={List}/>
    <Route path=":id" component={Show}/>
  </Route>
);

export default routes;
