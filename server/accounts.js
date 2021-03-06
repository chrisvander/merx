import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
    user.profile = options.profile;
    return user;
});

Meteor.methods({
    createCustomUser(email, password, reason, name) {
        let user = Accounts.createUser({ email, username: email, password, profile: { name, reason, courseStatus: {} }});
        return user;
    }
});