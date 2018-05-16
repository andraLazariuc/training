import { Meteor } from 'meteor/meteor';
import React from 'react';

const isOwner = userId => Meteor.userId() === userId;

const Comment = ({ comment }) => {
  const { _id, createdAt, userId, text } = comment;

  const cdate = new Date(createdAt).toLocaleString();
  const isCommentOwner = isOwner(userId);

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
            onClick={() => this.onClickDeleteComment(_id)}
          >
            <i className="fa fa-times" aria-hidden="true" /> Delete
          </button>
        )}
      </div>
    </li>
  );
};

export default Comment;
