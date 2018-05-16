import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import route from '/imports/routing/router.js';
import CommentsList from '/imports/ui/pages/comments/CommentsList.jsx';
import Posts from '/imports/api/posts';

class PostView extends React.Component {
  onClickChangeRoute(location) {
    route.go(location);
  }
  onLogOut() {
    Meteor.logout((err) => {
      console.log(`${err} uid: ${Meteor.userId()}`);
    });
    route.go('/');
  }

  render() {
    const { loading, post } = this.props;

    if (loading) {
      return <div>Loading </div>;
    }
    const { _id, title, description } = post;

    return (
      <div>
        <div className="col-xs-12 col-md-offset-2 col-md-8 text-right">
          <button
            className="btn btn-primary topBtn"
            onClick={() => this.onClickChangeRoute('/post/list')}
          >
            Posts List
          </button>
          <button
            className="btn btn-primary topBtn"
            onClick={() => this.onLogOut()}
          >
            Log Out
          </button>
        </div>
        <div className="col-md-offset-2 col-md-8 col-xs-12 container ">
          <div className="panel panel-default">
            <div className="panel-heading text-center">
              <strong>{title}</strong>
            </div>
            <div className="panel-body">
              <div className="col-xs-12">{description}</div>
              <br />
              <br />
              <CommentsList postId={_id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  const isObjectEmpty = obj => Object.keys(obj).length === 0;

  const handlePosts = Meteor.subscribe('posts');
  const postId = FlowRouter.getParam('_id');

  let post = {};
  post = Posts.findOne({ _id: postId });

  return {
    loading: !handlePosts.ready() && !(post && isObjectEmpty(post)),
    post,
  };
}, PostView);
