import React from 'react';
import { Container } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';


export const Profile = () => {
    const accounts = Meteor.users.findOne({ _id: Meteor.userId() })
    return (
        <Container>
            <h1 className="mt-5">Hello, Bob</h1>
            {JSON.stringify(accounts)}
        </Container>
    )
}
