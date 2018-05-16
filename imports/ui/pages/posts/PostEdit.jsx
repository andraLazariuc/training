import { Meteor } from 'meteor/meteor';
import React from 'react';
import AutoForm from 'uniforms-unstyled/AutoForm';
import { FlowRouter } from 'meteor/kadira:flow-router';

import route from '/imports/routing/router.js';
import PostUiSchema from './schema.js';
// diff between docs
require('babel-polyfill');

export default class PostEdit extends React.Component {
  constructor() {
    super();

    const postId = FlowRouter.getParam('_id');
    this.state = { loading: true, post: {}, postId };
  }

  componentDidMount() {
    Meteor.call('post.get', this.state.postId, (err, res) => {
      if (err) {
        console.log('There was an error loading post: ', err);
      } else {
        this.setState({
          loading: false,
          post: res,
        });
      }
    });
  }

  onSubmit = (data) => {
    // diff_docs will contain the diff between the 2 docs already formated for Posts.update
    const diff = require('rus-diff').diff;
    const diffDocs = diff(this.state.post, data);

    Meteor.call('post.edit', data._id, diffDocs, (err) => {
      if (err) {
        alert(err.reason);
        // throw new Error( err.message);
      } else {
        alert('Succes Editing Post');
        route.go('/post/list');
      }
    });
  };

  render() {
    const { loading, post } = this.state;

    if (loading) {
      return <div>Loading</div>;
    }

    return (
      <div className="col-md-offset-4 col-md-4 col-xs-12 container register-login">
        <div className="panel panel-default">
          <div className="panel-heading text-center">
            <strong>Edit Post</strong>
          </div>
          <div className="panel-body">
            <AutoForm
              schema={PostUiSchema}
              onSubmit={this.onSubmit}
              model={post}
            />
          </div>
        </div>
      </div>
    );
  }
}
