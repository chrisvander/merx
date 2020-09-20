import { Meteor } from 'meteor/meteor';

const username = Meteor.user().profile.name;
export default username;