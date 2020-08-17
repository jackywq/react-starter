import React, { Suspense } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import routes from '@/router';
import '@/App.less';

import Loading from '@/components/Loading';

const Routers = ({ history }) => {
  return (
    <Router history={history}>
      <Suspense maxDuration={1000} fallback={<Loading />}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/home" />} />
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
};

Routers.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Routers;
