import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
    const customizedUser = Object.assign({
      reason: 1
    }, user);
  
    if (options.profile) {
      customizedUser.profile = options.profile;
    }
  
    return customizedUser;
});

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
    }
});