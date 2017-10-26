import Comments from '/imports/api/comments/collection.js'
import SimpleSchema from 'simpl-schema';


export default CommentUiSchema = new SimpleSchema({
    text: {
        type: String,
        label: "Comment: ",
        max: 200
    }
});



 