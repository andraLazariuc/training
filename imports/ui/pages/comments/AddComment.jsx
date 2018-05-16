import { Meteor } from 'meteor/meteor';
import React from 'react';
import AutoForm from 'uniforms-unstyled/AutoForm';

import CommentUiSchema from './schema.js';

const onSubmit = ({ context, postId }) => {
  const comment = Object.assign(context, { postId });
  // console.log(`post id : ${data.postId}`);
  Meteor.call('comment.add', comment, (err) => {
    if (err) {
      alert(err.reason);
      // throw new Error( err.message);
    }
  });
};

const AddComment = ({ postId }) => (
  <div className="addCommentContainer">
    <AutoForm
      schema={CommentUiSchema}
      onSubmit={context => onSubmit({ context, postId })}
    />
  </div>
);

export default AddComment;
