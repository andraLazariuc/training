import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Random } from 'meteor/random';
import { _ } from 'meteor/underscore';

import { denodeify } from '/imports/utils/denodefy';
import './factories';

export const createPostWithComments = userId => {
  const post = Factory.create('post', { userId });
  // generate 6 comments for each post, 2 from the post's owner
  // and another 2/user for 2 random users
  _.times(2, () => {
    Factory.create('comment', { postId: post._id, userId });
    _.times(2, () =>
      Factory.create('comment', { postId: post._id, userId: Random.id() }),
    );
  });
  return post;
};

Meteor.methods({
  generateFixtures() {
    resetDatabase();

    // create 3 posts
    _.times(3, () => createPostWithComments(Random.id()));
  },
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
