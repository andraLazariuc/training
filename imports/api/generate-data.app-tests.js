import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Random } from 'meteor/random';
import { _ } from 'meteor/underscore';

import { denodeify } from '../utils/denodeify';

export const createPostWithComments = userId => {
  const post = Factory.create('post', { userId });
  // generate 9 comments for each post, 3 from the post's owner
  // and another 3/user for 2 random users
  _.times(3, () => {
    Factory.create('comment', { postId: post._id });
    _.times(2, () => Factory.create('comment', { postId: Random.id() }));
  });
  return post;
};

Meteor.methods({
  generateFixtures() {
    resetDatabase();

    // create 3 posts
    _.times(3, () => createPostWithComments(Random.id()));
  }
});

if (Meteor.isClient) {
  // Create a second connection to the server to use to call test data methods
  // We do this so there's no contention w/ the currently tested user's connection
  const testConnection = Meteor.connect(Meteor.absoluteUrl());

  const generateData = denodeify(cb => {
    testConnection.call('generateFixtures', cb);
  });

  export { generateData };
}
