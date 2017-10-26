import Login from '/imports/ui/pages/user/Login.jsx';
import route from '/imports/routing/router.js';

import React from 'react';
//import Paginator from 'react-paginator';
import { createContainer } from 'meteor/react-meteor-data';
import Comments from '/imports/api/comments/collection.js'
import '/imports/api/comments/methods.js';

import AutoForm from 'uniforms-unstyled/AutoForm';
import SubmitField from 'uniforms-unstyled/SubmitField';
import TextField   from 'uniforms-unstyled/TextField';
import CommentUiSchema from './schema.js';

class CommentsView extends React.Component {
   
    onClickChangeRoute(location) { route.go(location); }

    onClickDeleteComment(id) { 
        Meteor.call('comment.remove', id, (err, res) => {
               if(err){
                 alert(err.reason);
                 //throw new Error( err.message);               
               }
               else{
                  alert('Succes Deleting Comment');  
               }
            }) ;
    }

    onSubmit = data => {  
          data.postId =  this.props.postId; console.log('post id : ' + data.postId);
          Meteor.call('comment.add', data , (err, res) => {
                 if(err){
                   alert(err.reason);
                   //throw new Error( err.message);               
                 }
                 else{
                    //alert('Succes Adding Comment');  
                 }
              }) 
      };

    render() {
        const {loading, comments ,postId} = this.props;
       
        if (loading) {
          return <div>Loading </div>
        }
        if(Meteor.userId()){
          return (
            <div className="container">                      
              <ul className="list-group">                        
              {
                comments.map(comment => {
                  var cdate = (new Date(comment.createdAt)).toLocaleString();
                                        
                  if(Meteor.userId() != comment.userId){
                    return <li className="list-group-item" key={comment._id}>  
                            <div className="container">                                                 
                              <p className="col-xs-8">{comment.text}</p>
                              <div className="col-xs-2 comment-list-item"> {cdate} </div>     
                              </div>                                               
                            </li>
                  }else{
                    return <li className="list-group-item" key={comment._id}>
                              <div className="container">
                                <p className="col-xs-8" style={{'wordBreak': 'break-all'}}>{comment.text}</p>
                                <div className="col-xs-2 comment-list-item text-right"> {cdate} </div>

                                <button className=" btn btn-danger editCommentBtn" onClick={_ => this.onClickDeleteComment( comment._id )}>
                                  <i className="fa fa-times" aria-hidden="true"></i> Delete
                                </button>
                              </div>
                            </li>
                  }                                   
                })
              }                        
              </ul>

              <div className="addCommentContainer">
                
                      <AutoForm schema={CommentUiSchema} onSubmit={this.onSubmit} >
                        {/*<h2>Add comment</h2>
                        <TextField name="text" />                       
                          
                        <button type="submit" className="btn btn-warning editCommentBtn" >
                              <i className="fa fa-plus" aria-hidden="true"></i> Add
                        </button>*/}
                        
                      </AutoForm>
                  
              </div>
            </div>                     

            )
        }else{
          return (

            <div className="container">                      
              <ul className="list-group">                        
              {
                comments.map(comment => {
                  var cdate = (new Date(comment.createdAt)).toLocaleString();
                                        
                  if(Meteor.userId() != comment.userId){
                    return <li className="list-group-item" key={comment._id}>                                                   
                              {comment.text}
                              <span className="comment-list-item"> {cdate} </span>                                                    
                            </li>
                  }
                  else{
                    return <li className="list-group-item" key={comment._id}>

                              {comment.text}
                              <span className="comment-list-item"> {cdate} </span>

                              <button className="btn btn-danger editCommentBtn" onClick={_ => this.onClickDeleteComment( comment._id )}>
                                <i className="fa fa-times" aria-hidden="true"></i> Delete
                              </button>
                            </li>
                  }                                   
                })
              }                        
              </ul>
            </div>                     

            )
        }       
    }
}

export default createContainer((props) => {
   const handleComments = Meteor.subscribe('comments');
   
    var _postId = props.postId; 
    var comms =  [];
    Meteor.call('comment.list', _postId, (err, res) => {
        if (err) {
                  console.log('There was an error loading comments: ', err);
                  
        } else {
                  console.log('Wooho! No Errors loading comments: ');  
                  comms = res;
              }
          });
          
  return {
              
            loading: !handleComments.ready() ,
            //comments: Meteor.call('comments.list', _postId),
            comments: Comments.find( { postId : _postId } ).fetch(),
            postId: _postId
            
        }
}, CommentsView);