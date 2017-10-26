import { Mongo } from 'meteor/mongo';
import Posts from '/imports/api/posts/collection.js';


Posts.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
  doc.userId = Meteor.userId();
  doc.updatedAt = Date.now();
  console.log('hello from comm hooks before.insert');
});

Posts.before.update(function (userId, doc) {
  doc.updatedAt = Date.now();
});