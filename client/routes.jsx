import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { withRouter } from 'react-router-dom';

import { WelcomePage } from "/imports/ui/WelcomePage";
import { LoginPage } from '../imports/ui/LoginPage';
import GetStarted from '../imports/ui/GetStarted';
import { Dashboard } from '../imports/ui/Dashboard';
import { Logout } from '../imports/ui/Logout';
import { Layout } from '../imports/ui/Layout';

const browserHistory = createBrowserHistory({ forceRefresh: true });

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Layout>
            <Switch>
                <Route exact path="/" component={withRouter(WelcomePage)} />
                <Route exact path="/login" component={withRouter(LoginPage)} />
                <Route exact path="/get-started" component={withRouter(GetStarted)} />
                <Route exact path="/dashboard" component={withRouter(Dashboard)} />
                <Route exact path="/logout" component={withRouter(Logout)} />
                <Route path="/*" component={withRouter(WelcomePage)} />
            </Switch>
        </Layout>
    </Router>
);