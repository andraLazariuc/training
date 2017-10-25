import React from 'react';

import route from '/imports/routing/router.js';

// Choose your theme
import AutoForm from 'uniforms-unstyled/AutoForm';

// A compatible schema
import PostSchema from '/imports/api/posts/schema.js';

import wrapWithTryCatch from 'react-try-catch-render';
import '/imports/api/posts/methods.js';
//diff between docs
require("babel-polyfill");

export default class PostEdit extends React.Component {
  constructor(id) {
      super();
     
      var _postId = FlowRouter.getParam('_id'); 
      this.state = {loading: true, post: {}, postId : _postId};
    
  }
  componentDidMount() {
      /*this.setState({
                 postId: this.props.postId
             });*/
      Meteor.call('post.get', this.state.postId, (err, res) => {
          if (err) {
              console.log('There was an error loading post: ', err);
              // in err object you have to (err.error, err.reason, err.details)
          } else {
              console.log('Wooho! No Errors loading post to edit: ' );console.log(res.userId);
              this.setState({
                             loading: false,
                             post: res // assuming the method returns an array of donuts                              
              })
          }
      })
  }
	onSubmit = data => {	
    // used for updating whole doc with {validate:false} 
    // myCollection.update(someId, myDoc, {validate: false});
      /*PostSchema.clean(data); 
      check(data, PostSchema);   */

    //diff_docs will contain the diff between the 2 docs already formated for Posts.update
      var diff = require('rus-diff').diff;
      var diff_docs = diff(this.state.post, data);
	    
      /* wouldn't it be better to check for post.userId here? */
      //if(Meteor.userId() != data.userId){ 

      Meteor.call('post.edit', data._id, diff_docs , (err, res) => {
             if(err){
               alert(err.reason);
               //throw new Error( err.message);               
             }
             else{
                alert('Succes Editing Post');  
                route.go('/post/list');    
             }
          }) 
	};
    render() {
      
       return (

        <div className="col-md-offset-4 col-md-4 col-xs-12 container register-login">
          <div className="panel panel-default">
            <div className="panel-heading text-center"><strong>Edit Post</strong></div>
            <div className="panel-body">
              <AutoForm
                  schema={PostSchema}
                  onSubmit={this.onSubmit}
                  model = {this.state.post}
              />              
            </div>
          </div>
        </div>
       )
    }
}