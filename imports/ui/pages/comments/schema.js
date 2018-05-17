import SimpleSchema from 'simpl-schema';

const CommentUiSchema = new SimpleSchema({
  text: {
    type: String,
    label: 'Comment: ',
    max: 200,
  },
});

export default CommentUiSchema;
