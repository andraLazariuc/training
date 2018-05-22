/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { chai, assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { _ } from 'meteor/underscore';

import './publication.js';
import '../../factories';
import { createPostWithComments } from '../../generate-data.test';
import Posts from '../../posts/';
import Comments from '../comments';
import { add, list, get, remove, checkOwner } from './methods';

describe('comments', function () {
  describe('mutators', function () {
    it('builds correctly from factory', function () {
      // const user = Factory.create('user', err => console.log(err));
      // const post = Factory.create('post', { userId: user._id });
      // const comment = Factory.create('comment', { postId: post._id });
      const comment = Factory.create('comment');
      assert.typeOf(comment, 'object');
      assert.typeOf(comment.text, 'string');
      // assert.match(comment.text, /[] /);
    });
  });
  describe('publications', function () {
    Posts.remove({});
    Comments.remove({});

    let post;
    const userId = Random.id();

    beforeEach(function () {
      // create 3 posts with 6 comments/per post
      post = createPostWithComments(userId);
      _.times(2, () => createPostWithComments(Random.id()));
    });

    describe('comments', function () {
      it('sends all comments', function (done) {
        const collector = new PublicationCollector();
        collector.collect('comments', {}, (collections) => {
          chai.assert.equal(collections.comments.length, 19);
          done();
        });
      });
    });

    // describe('comments.forUser', function () {
    //   it('sends all comments of a user', function (done) {
    //     const collector = new PublicationCollector();
    //     collector.collect('comments.createdBy', { userId }, (collections) => {
    //       chai.assert.isAtLeast(collections.comments.length, 2);
    //       done();
    //     });
    //   });
    // });
    describe('comments.forPost', function () {
      it('sends all comments for a post', function (done) {
        const collector = new PublicationCollector();
        collector.collect(
          'comments.ofPost',
          { postId: post._id },
          (collections) => {
            chai.assert.equal(collections.comments.length, 6);
            done();
          },
        );
      });
    });
    // describe('comments.perUserforPost', function () {
    //   it('sends all user comments for a post', function (done) {
    //     const collector = new PublicationCollector({ userId });
    //     collector.collect(
    //       'comments.perUserforPost',
    //       { postId: post._id, userId },
    //       (collections) => {
    //         // chai version too old for isAtLeast
    //         chai.assert.isAtLeast(collections.comments.length, 2);
    //         done();
    //       },
    //     );
    //   });
    // });
  });
  describe('methods', function () {
    let postId;
    let comment;
    let user;
    let otherUser;
    let contextLoggedInMyUser;
    let contextLoggedInOtherUser;
    let contextNotLoggedIn;

    const removeComment = Meteor.server.method_handlers['comment.remove'];

    beforeEach(function () {
      // Clear
      Posts.remove({});
      Comments.remove({});
      Meteor.users.remove({});

      // Generate a 'user'
      user = Factory.create('user');
      otherUser = Factory.create('user');
      contextLoggedInMyUser = { userId: user._id };
      contextLoggedInOtherUser = { userId: otherUser._id };
      contextNotLoggedIn = { userId: null };
      // Create a post and a comment in that post
      postId = Factory.create('post', { userId: user._id })._id;
      comment = Factory.create('comment', { postId, userId: user._id });
    });
    describe('add', () => {
      it('adds a comment, but only if you are logged in', function (done) {
        const args = comment;
        // no need for id when inserting a new comment
        delete args._id;

        // const newlyInsertedCommentId = add._execute(
        //   contextLoggedInMyUser,
        //   args,
        // );

        // assert.equal(Comments.find({ _id: newlyInsertedCommentId }).count(), 1);

        // assert.throws(
        //   () => {
        //     add._execute(contextNotLoggedIn, args);
        //   },
        //   Meteor.Error,
        //   /comments.insert.accessDenied/,
        // );

        assert.throws(
          () => {
            Meteor.call('comment.add', args);
          },
          Meteor.Error,
          /comments.insert.accessDenied/,
        );

        // Find the internal implementation of the comment method so we can
        // test it in isolation
        const addComment = Meteor.server.method_handlers['comment.add'];
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId: user._id };
        // Run the method with `this` set to the fake invocation
        addComment.apply(invocation, [args]);
        // Verify that the method does what we expected
        assert.equal(Comments.find({}).count(), 2);
        done();
      });
    });
    describe('remove', function () {
      it('deletes a comment', function () {
        const args = comment._id;
        // const invocation = { userId: user._id };
        removeComment.apply(contextLoggedInMyUser, [args]);
        assert.equal(Comments.find({}).count(), 0);
      });
      it('deletes a comment only if you are logged in', function () {
        const args = comment._id;

        assert.throws(
          () => {
            removeComment.apply(contextNotLoggedIn, [args]);
          },
          Meteor.Error,
          /comments.remove.accessDeniedNotLoggedIn/,
        );
      });
      it("does not delete a comment you don't own", function () {
        const args = comment._id;

        assert.throws(
          () => {
            removeComment.apply(contextLoggedInOtherUser, [args]);
          },
          Meteor.Error,
          /comments.remove.accessDeniedNotOwner/,
        );
      });
    });
  });
});
