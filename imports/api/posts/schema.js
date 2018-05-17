import SimpleSchema from 'simpl-schema';

const PostSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
    max: 200,
  },
  description: {
    type: String,
    label: 'Description',
    optional: true,
    max: 1000,
  },
  userId: {
    type: String,
    // optional: true
  },
  createdAt: {
    type: Date,
    optional: true,
  },
  updatedAt: {
    type: Date,
    optional: true,
  },
});

export default PostSchema;
