import React from 'react';
import { Meteor } from 'meteor/meteor';

import { WelcomePage } from './WelcomePage.jsx';
import { UEFANavbar } from './Navbar.jsx';

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
