import Posts from '/imports/api/posts';

import SimpleSchema from 'simpl-schema';

export default (PostSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
    max: 200
  },
  description: {
    type: String,
    label: 'Description',
    optional: true,
    max: 1000
  },
  userId: {
    type: String
    // optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  }
}));
