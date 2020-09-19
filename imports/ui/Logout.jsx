import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

export const Logout = () => {
    Meteor.logout();
    return <Redirect to="/" />
}
