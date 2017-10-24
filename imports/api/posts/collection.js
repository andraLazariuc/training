import { Mongo } from 'meteor/mongo';


const Posts = new Mongo.Collection('posts');

Posts.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
  doc.userId = Meteor.userId();
});

export default Posts;