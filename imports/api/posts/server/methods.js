import { Meteor } from 'meteor/meteor';

import Posts from '/imports/api/posts';

const add = (data) => {
  if (!Meteor.userId()) {
    throw new Meteor.Error(
      'comments.insert.accessDenied',
      'You need to be logged in to add comments to posts!',
    );
  }

  const post = Object.assign(data, { userId: Meteor.userId() });
  return Posts.insert(post);
};

Meteor.methods({
  'post.create': add,

  'post.list': function () {
    return Posts.find().fetch();
  },

  'post.get': function (id) {
    return Posts.findOne({ _id: id });
  },

  'post.edit': function (id, data) {
    if (Meteor.call('post.check_owner', id)) {
      Posts.update(id, data, (errUpdate, resUpdate) => {
        if (errUpdate) {
          console.log(`There was an error updating post: ${errUpdate}`);
        } else {
          console.log('Wooho! No Errors updating post : ');
        }
      });
    }
  },

  'post.remove': function (id) {
    if (Meteor.call('post.check_owner', id)) {
      return Posts.remove({ _id: id }, (err, res) => {
        if (err) {
          throw new Meteor.Error(
            403,
            `There was an error while deleting the post: ${err}`,
          );
        } else {
          console.log('Wooho! No Errors deleting post : ');
          return true;
        }
      });
    }
  },

  'post.check_owner': function (id) {
    const post = Meteor.call('post.get', id);
    if (Meteor.userId() != post.userId) {
      throw new Meteor.Error(
        403,
        "You are not allowed to edit another user's post!",
      );
    } else {
      return true;
    }
  },
});
