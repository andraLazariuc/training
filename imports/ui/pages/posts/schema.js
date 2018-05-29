import SimpleSchema from 'simpl-schema';

const PostUiSchema = new SimpleSchema({
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
});

export default PostUiSchema;
