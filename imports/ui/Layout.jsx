import React from 'react';
import { UEFANavbar } from './Navbar';
import { withTracker } from 'meteor/react-meteor-data';

const LayoutUnder = (props) => {
    console.log("LAYOUT CALLED WITH PROPS", props.children.props.children)
    return (
        <div>
            <UEFANavbar />
            {props.children}
        </div>
    );
}

export const Layout = withTracker(props => {
    return {
        user: Meteor.user()
    }
})(LayoutUnder);