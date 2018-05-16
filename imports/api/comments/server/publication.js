import { Meteor } from 'meteor/meteor';

import Comments from '/imports/api/comments';

Meteor.publish('comments', function() {
  return Comments.find();
});
