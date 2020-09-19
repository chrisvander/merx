import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { WelcomePage } from './WelcomePage.jsx';
import { UEFANavbar } from './Navbar.jsx';
import { Layout } from './Layout';

export const App = (props) => {
    return (
      <WelcomePage />
    );
};

// export const App = withTracker(props => {
//   return {
//     user: Meteor.user()
//   }
// })(AppPage);
