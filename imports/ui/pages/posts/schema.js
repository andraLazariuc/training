import Posts from '/imports/api/posts';
import SimpleSchema from 'simpl-schema';

export default (PostUiSchema = new SimpleSchema({
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
  }
}));
