import { Mongo } from 'meteor/mongo';

import Posts from '/imports/api/posts';

Posts.before.insert(function(userId, doc) {
  doc.createdAt = Date.now();
  doc.userId = Meteor.userId();
  doc.updatedAt = Date.now();
});

Posts.before.update(function(userId, doc) {
  doc.updatedAt = Date.now();
});
