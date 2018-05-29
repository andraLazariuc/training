import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

const Comment = ({ comment, loggedInUserId }) => {
  const { _id, createdAt, userId, text } = comment;

  const cdate = new Date(createdAt).toLocaleString();
  const isCommentOwner = loggedInUserId === userId;

  const onClickDeleteComment = (id) => {
    Meteor.call('comment.remove', id, (err) => {
      if (err) {
        alert(err.reason);
        // throw new Error( err.message);
      }
    });
  };

  if (!(_id && userId && text && createdAt)) {
    return null;
  }

  return (
    <li className="list-group-item" key={_id}>
      <div className="container">
        <p className="col-xs-8" style={{ wordBreak: 'break-all' }}>
          {text}
        </p>
        <div className="col-xs-2 comment-list-item text-right"> {cdate} </div>

        {isCommentOwner && (
          <button
            className=" btn btn-danger editCommentBtn"
            onClick={() => onClickDeleteComment(_id)}
          >
            <i className="fa fa-times" aria-hidden="true" /> Delete
          </button>
        )}
      </div>
    </li>
  );
};

export default createContainer(
  () => ({
    loggedInUserId: Meteor.userId(),
  }),
  Comment,
);
