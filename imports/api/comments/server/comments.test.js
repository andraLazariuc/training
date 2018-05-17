/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Factory } from 'meteor/dburles:factory';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { chai, assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { _ } from 'meteor/underscore';

import './publications.js';
import { createPostWithComments } from '../../generate-data.app-tests';

describe('comments', function () {
  describe('mutators', function () {
    it('builds correctly from factory', function () {
      const comment = Factory.create('comment');
      assert.typeOf(comment, 'object');
      assert.match(comment.text, /Comment /);
    });
  });
  describe('publications', function () {
    let post;
    let userId;
    before(function () {
      // create 3 posts with 9 comments/per post
      createPostWithComments(userId);
      _.times(2, () => createPostWithComments(Random.id()));
    });
    describe('comments.forPost', function () {
      it('sends all comments for a post', function (done) {
        const collector = new PublicationCollector();
        collector.collect(
          'comments.forPost',
          { postId: post._id },
          (collections) => {
            chai.assert.equal(collections.comments.length, 9);
            done();
          },
        );
      });
      it('sends all user comments for a post', function (done) {
        const collector = new PublicationCollector({ userId });
        collector.collect(
          'comments.forPostPerUser',
          { postId: post._id, userId },
          (collections) => {
            chai.assert.isAtLeast(collections.comments.length, 3);
            done();
          },
        );
      });
    });
  });
});
