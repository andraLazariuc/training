import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import route from '/imports/routing/router.js';
import Posts from '/imports/api/posts';

class PostsList extends React.Component {
  onClickChangeRoute(location) {
    route.go(location);
  }

  onLogOut() {
    Meteor.logout((err) => {
      console.log(`${err} uid: ${Meteor.userId()}`);
    });
    route.go('/');
  }

  onClickDeletePost(id) {
    Meteor.call('post.remove', id, (err) => {
      if (err) {
        alert(err.reason);
        // throw new Error( err.message);
      } else {
        alert('Succes Deleting Post');
        route.go('/post/list');
      }
    });
  }

  onClickEditPost(id) {
    route.go(`/post/edit/${id}`);
  }
  // route.go('PostEdit',  {postId: id, query: 'string'});}

  onClickSeePost(id) {
    route.go(`/post/view/${id}`);
  }

  isOwner = userId => Meteor.userId() === userId;

  render() {
    const { loading, posts } = this.props;

    if (loading) {
      return <div>Loading </div>;
    }
    return (
      <div>
        <div className="col-xs-12 col-md-offset-2 col-md-8 text-right">
          <button
            className="btn btn-primary topBtn"
            onClick={() => this.onClickChangeRoute('/post/create')}
          >
            Add Post
          </button>
          <button
            className="btn btn-primary topBtn"
            onClick={() => this.onLogOut()}
          >
            Log Out
          </button>
        </div>
        <div className="container">
          <h2>Posts List </h2>
          <ul className="list-group">
            {posts.map(({ _id, createdAt, title, userId }) => {
              const cdate = new Date(createdAt).toLocaleString();
              const isPostOwner = this.isOwner(userId);

              return (
                <li className="list-group-item" key={_id}>
                  <div className="container">
                    <div className="col-xs-12 info">
                      <span className="col-xs-6 ">{title}</span>
                      <span className="col-xs-2 post-list-item"> {cdate} </span>
                      <div className="post-list-buttons">
                        {isPostOwner && (
                          <button
                            className="btn btn-danger editPostBtn"
                            onClick={() => this.onClickDeletePost(_id)}
                          >
                            <i className="fa fa-times" aria-hidden="true" />{' '}
                            Delete
                          </button>
                        )}
                        {isPostOwner && (
                          <button
                            className="btn btn-warning editPostBtn"
                            onClick={() => this.onClickEditPost(_id)}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            />{' '}
                            Edit
                          </button>
                        )}

                        <button
                          className="btn btn-primary editPostBtn"
                          onClick={() => this.onClickSeePost(_id)}
                        >
                          <i className="fa fa-eye" aria-hidden="true" /> See
                          Post
                        </button>
                      </div>
                    </div>

                    <div className="col-xs-12" id="postComm{post._id}" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  const handle = Meteor.subscribe('posts');

  return {
    loading: !handle.ready(),
    posts: Posts.find().fetch(),
  };
}, PostsList);
