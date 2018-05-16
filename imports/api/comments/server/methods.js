import { Meteor } from 'meteor/meteor';

import Comments from '/imports/api/comments';
import Security from '/imports/api/security.js';

export const add = function(comment) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(
      'comments.insert.accessDenied',
      'You need to be logged in to add comments to posts!'
    );
  }

  Comments.insert(comment);
};

export const list = function(postId) {
  return Comments.find({ postId: postId }).fetch();
};

export const get = function(id) {
  return Comments.findOne({ _id: id });
};

export const remove = function(id) {
  if (Meteor.call('comment.check_owner', id)) {
    return Comments.remove({ _id: id }, (err, res) => {
      if (err) {
        throw new Meteor.Error(
          403,
          'There was an error while deleting the comment: ' + err
        );
      } else {
        console.log('Wooho! No Errors deleting comment  ');
        return true;
      }
    });
  }
};

export const check_owner = function(id) {
  var comment = Meteor.call('comment.get', id);
  if (Meteor.userId() != comment.userId) {
    throw new Meteor.Error(
      403,
      "Not matching user ids! You are not allowed to edit another user's comment!"
    );
  } else {
    return true;
  }
};

Meteor.methods({
  'comment.add': add,
  'comment.list': list,
  'comment.get': get,
  'comment.remove': remove,
  'comment.check_owner': check_owner
});
