import React from 'react';

import route from '/imports/routing/router.js';

import CommentView from '/imports/ui/pages/comments/CommentView.jsx';

import wrapWithTryCatch from 'react-try-catch-render';
import '/imports/api/posts/methods.js';
import '/imports/api/comments/methods.js';

import Posts from '/imports/api/posts/collection.js';
import Comments from '/imports/api/comments/collection.js';
import { createContainer } from 'meteor/react-meteor-data';

class PostView extends React.Component {

    onClickChangeRoute(location) { route.go(location); }
    onLogOut() { 
        Meteor.logout(function(err){ 
          console.log(err + ' uid: ' + Meteor.userId());
        }); 
        route.go('/');
       
    }

    render() {
      const {loading, post } = this.props; 
      if(loading){
        //console.log('post inside renderer PostView loading true: ' ); console.log(post);
        return <div>Loading </div>
      }else{
        //console.log('post inside renderer PostView loading false: ' ); console.log(post);
        
       return (
        <div>
        <div className="col-xs-12 col-md-offset-2 col-md-8 text-right">
          <button className="btn btn-primary topBtn" onClick={_ => this.onClickChangeRoute('/post/list')}>Posts List</button>
          <button className="btn btn-primary topBtn" onClick={_ => this.onLogOut()}>Log Out</button>           
        </div>
        <div className="col-md-offset-2 col-md-8 col-xs-12 container ">
          <div className="panel panel-default">
            <div className="panel-heading text-center"><strong>{post.title}</strong></div>
            <div className="panel-body">
              <div className="col-xs-12">{post.description}</div>
              <br></br><br></br>
              {<CommentView postId={post._id}/>   }        
            </div>
          </div>
        </div>
        </div>
                     
      )
     }
    }
}

export default createContainer(() => {
  
  const handlePosts = Meteor.subscribe('posts');

  var _postId = FlowRouter.getParam('_id'); 
  
  var _post = {};
 /* Meteor.call('post.get', _postId, (err, res) => {
            if (err) {
                _post = {};
            } else {              
                _post = res;              
            }
          });*/
  _post = Posts.findOne({ _id :  _postId });
     
  function isEmpty(obj) {
      for(var prop in obj) {
             if(obj.hasOwnProperty(prop))
                 return false;
         }

         return true;
  }
return {
            
          loading: !handlePosts.ready() && isEmpty(_post),          
          //post: Posts.findOne({ _id :  _postId })
          post: _post
          
      }
}, PostView);