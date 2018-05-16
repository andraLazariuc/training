import SimpleSchema from 'simpl-schema';
import Comments from '/imports/api/comments';

export default (CommentUiSchema = new SimpleSchema({
  text: {
    type: String,
    label: 'Comment: ',
    max: 200
  }
}));
