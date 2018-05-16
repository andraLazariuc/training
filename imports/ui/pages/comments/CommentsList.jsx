import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import route from '/imports/routing/router.js';
import Comments from '/imports/api/comments';
import Comment from './Comment';
import AddComment from './AddComment';

class CommentsList extends React.Component {
  onClickChangeRoute(location) {
    route.go(location);
  }

  onClickDeleteComment(id) {
    Meteor.call('comment.remove', id, (err) => {
      if (err) {
        alert(err.reason);
        // throw new Error( err.message);
      } else {
        alert('Succes Deleting Comment');
      }
    });
  }

  render() {
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
  }
}

export default createContainer(({ postId }) => {
  const handleComments = Meteor.subscribe('comments');

  Meteor.call('comment.list', postId, (err) => {
    if (err) {
      console.log('There was an error loading comments: ', err);
    } else {
      console.log('Wooho! No Errors loading comments: ');
    }
  });

  return {
    loading: !handleComments.ready(),
    comments: Comments.find({ postId }).fetch(),
    postId,
  };
}, CommentsList);
