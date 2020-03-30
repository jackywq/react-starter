import React, { Component, Suspense } from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import routes from '@/router';
import '@/App.less';

import Loading from '@/components/Loading';

const historyInstance = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={historyInstance}>
        <Suspense maxDuration={1000} fallback={<Loading />}>
          <Switch>
            {routes.map(({ path, component: ComponentItem }) => (
              <Route
                exact
                key={path}
                path={path}
                render={() => <ComponentItem />}
              />
            ))}
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
