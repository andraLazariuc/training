import { Meteor } from 'meteor/meteor';

import Comments from '/imports/api/comments';

export const add = (comment) => {
  if (!Meteor.userId()) {
    throw new Meteor.Error(
      'comments.insert.accessDenied',
      'You need to be logged in to add comments to posts!',
    );
  }

  Comments.insert(comment);
};

export const list = postId => Comments.find({ postId }).fetch();

export const get = id => Comments.findOne({ _id: id });

export const remove = (id) => {
  Meteor.call('comment.check_owner', id, (errOwner) => {
    if (errOwner) {
      return false;
    }

    return Comments.remove({ _id: id }, (err) => {
      if (err) {
        throw new Meteor.Error(
          403,
          `There was an error while deleting the comment: ${err}`,
        );
      }
      // console.log('Wooho! No Errors deleting comment  ');
      return true;
    });
  });
};

export const checkOwner = (id) => {
  if (!id) {
    return false;
  }

  const comment = Meteor.call('comment.get', id);
  const userId = comment ? comment.userId : '';

  if (Meteor.userId() !== userId) {
    throw new Meteor.Error(
      403,
      "Not matching user ids! You are not allowed to edit another user's comment!",
    );
  }
  return true;
};

Meteor.methods({
  'comment.add': add,
  'comment.list': list,
  'comment.get': get,
  'comment.remove': remove,
  'comment.check_owner': checkOwner,
});
