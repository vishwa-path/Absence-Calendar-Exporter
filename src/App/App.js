import React, { Component } from 'react';

import { createBrowserHistory } from 'history';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import Home from './Home';

let history =  createBrowserHistory();

export default class App extends Component {
  
  render() {
    return (
      <Router history={history}>
        <Switch>
        <Route exact path={`/:userId`} component={Home} />
        <Route exact path={`/:startDate/:endDate`} component={Home} />
        <Route exact path='' component={Home} />
        <Redirect from='*' to='' />
      </Switch>
      </Router>
    );
  }
}
