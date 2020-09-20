import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
    console.log("onCreateUser called")
    console.log(options, user)
    user.profile = options.profile;
    return user;
});

Meteor.methods({
    createCustomUser(email, password, reason) {
        let user = Accounts.createUser({ email, username: email, password, profile: { name: 'Bob', reason }});
        return user;
    }
});