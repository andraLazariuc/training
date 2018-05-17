import SimpleSchema from 'simpl-schema';

const CommentSchema = new SimpleSchema({
  text: {
    type: String,
    label: 'Text',
    max: 200,
  },
  userId: {
    type: String,
    optional: true,
  },
  postId: {
    type: String,
    optional: true,
  },
  createdAt: {
    type: Date,
    optional: true,
  },
});

export default CommentSchema;
