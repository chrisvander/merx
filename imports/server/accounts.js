import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
    console.log(user)
    const customizedUser = Object.assign({
      reason: 1
    }, user);
  
    if (options.profile) {
      customizedUser.profile = options.profile;
    }
  
    return customizedUser;
});

Meteor.methods({
    createUser(email, password, key, cb) {
        Accounts.createUser({ email, username: email, password, profile: { name: 'Bob', reason: key } }, err => {
            if (err) {
                cb(err)
            }
            else {
                cb(null, Meteor.userId())
            }
        })
    }
});