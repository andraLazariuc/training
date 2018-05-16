import { Mongo } from 'meteor/mongo';

import Comments from '/imports/api/comments';

Comments.before.insert(function(userId, doc) {
  doc.createdAt = Date.now();
  doc.userId = Meteor.userId();

  doc.updatedAt = Date.now();
});

Comments.before.update(function(userId, doc) {
  doc.updatedAt = Date.now();
});
