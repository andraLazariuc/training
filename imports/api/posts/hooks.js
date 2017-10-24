import { Mongo } from 'meteor/mongo';
import Posts from '/imports/api/posts/collection.js';

Posts.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
  doc.userId = Meteor.userId();
});