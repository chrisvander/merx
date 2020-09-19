import React from 'react';
import { Container } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';


export const Profile = () => {
    const account = Meteor.users.findOne({ _id: Meteor.userId() }, { name: 'bob' })
    if (account == null) {
        return "Not logged in"
    }
    console.log(account)
    console.log(account.reason)
    return (
        <Container>
            <h1 className="mt-5">Hello, Bob</h1>
            {JSON.stringify(account)}
        </Container>
    )
}
