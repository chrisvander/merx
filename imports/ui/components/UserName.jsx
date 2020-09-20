import React from 'react';
import { Meteor } from 'meteor/meteor';

const UserName = () => {
    const user = Meteor.user();
    if (user) {
        return user.profile.name;
    } else return "user";
};

export default UserName;