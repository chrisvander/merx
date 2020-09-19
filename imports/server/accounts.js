import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    createUser(email, password, cb) {
        Accounts.createUser({ email, username: email, password }, err => {
            if (err) {
                cb(err)
            }
            else {
                cb(null, Meteor.userId())
            }
        })
    },
    updatePreferences(userID, preference) {
    }
});