import { Meteor } from 'meteor/meteor';

import Comments from '/imports/api/comments';

Meteor.publish('comments', () => Comments.find());
Meteor.publish('comments.ofPost', postId => Comments.find(postId));
Meteor.publish('comments.createdBy', userId => Comments.find(userId));
Meteor.publish('comments.perUserforPost', ({ postId, userId }) =>
  Comments.find({ $and: [userId, postId] }));
