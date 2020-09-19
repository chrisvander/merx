import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { WelcomePage } from "/imports/ui/WelcomePage";
import { LoginPage } from '../imports/ui/LoginPage';
import GetStarted from '../imports/ui/GetStarted';
import { Dashboard } from '../imports/ui/Dashboard';
import { Logout } from '../imports/ui/Logout';
import { Error } from '../imports/ui/Error';
import { UEFANavbar } from '../imports/ui/Navbar';
import { Course } from '../imports/ui/Course';
import { Profile } from '../imports/ui/Profile';

const browserHistory = createBrowserHistory({ forceRefresh: true });

const UntrackedRoutes = () => (
    <Router history={browserHistory}>
        <UEFANavbar />
        <Switch>
            <Route exact path="/" component={withRouter(WelcomePage)} />
            <Route path="/login" component={withRouter(LoginPage)} />
            <Route path="/get-started" component={withRouter(GetStarted)} />
            <Route path="/dashboard" component={withRouter(Dashboard)} />
            <Route path="/course/:courseID" render = {props => <Course {...props} />} />
            <Route path="/logout" component={withRouter(Logout)} />
            <Route path="/profile" component={Profile} />
            <Route component={Error} />
        </Switch>
    </Router>
);

export const Routes = withTracker(props => {
    return {
        user: Meteor.user()
    }
})(UntrackedRoutes);