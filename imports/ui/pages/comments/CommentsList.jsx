import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Comments from '/imports/api/comments';
import Comment from './Comment';
import AddComment from './AddComment';

const CommentsList = () => {
  const { loading, comments, postId } = this.props;

  if (loading) {
    return <div>Loading </div>;
  }

  return (
    <div className="container">
      <ul className="list-group">
        {comments.map(comment => (
          <Comment comment={comment} key={comment._id} />
        ))}
      </ul>

      <AddComment postId={postId} />
    </div>
  );
};

export default createContainer(({ postId }) => {
  const handleComments = Meteor.subscribe('comments');

  return {
    loading: !handleComments.ready(),
    comments: Comments.find({ postId }).fetch(),
    postId,
  };
}, CommentsList);
