import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import Comments from '/imports/api/comments';

export const checkCommentOwner = (contextUserId, commentId) => {
  if (!commentId) {
    return false;
  }

  const comment = Meteor.call('comment.get', commentId);
  const commentOwnerId = comment ? comment.userId : '';

  if (!commentOwnerId) {
    return false;
  }

  return contextUserId === commentOwnerId;
};

// export const add = new ValidatedMethod({
//   name: 'comment.add',
//   validate: new SimpleSchema({
//     // comment: { type: Object },
//     text: {
//       type: String,
//     },
//     userId: {
//       type: String,
//       optional: true,
//     },
//     postId: {
//       type: String,
//       optional: true,
//     },
//     createdAt: {
//       type: Date,
//       optional: true,
//     },
//     // text: { type: String },
//   }).validator(),
//   run({ text, userId, postId, createdAt }) {
//     if (!this.userId) {
//       throw new Meteor.Error(
//         'comments.insert.accessDenied',
//         'You need to be logged in to add comments to posts!',
//       );
//     }

//     return Comments.insert({ text, userId, postId, createdAt });
//   },
// });

export const add = function (comment) {
  if (!this.userId) {
    throw new Meteor.Error(
      'comments.insert.accessDenied',
      'You need to be logged in to add comments to posts!',
    );
  }

  return Comments.insert(comment);
};

export const list = postId => Comments.find({ postId }).fetch();

export const get = id => Comments.findOne({ _id: id });

export const remove = function (id) {
  if (!this.userId) {
    throw new Meteor.Error(
      'comments.remove.accessDeniedNotLoggedIn',
      'You need to be logged in to delete comments!',
    );
  }

  const isCommentOwner = checkCommentOwner(this.userId, id);

  if (!isCommentOwner) {
    throw new Meteor.Error(
      'comments.remove.accessDeniedNotOwner',
      'You can only delete your own comments!',
    );
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
};

Meteor.methods({
  'comment.add': add,
  // [add.name]: (args) => {
  //   add.validate.call(this, args);
  //   add.run.call(this, args);
  // },
  'comment.list': list,
  'comment.get': get,
  'comment.remove': remove,
});
