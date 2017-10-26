import Login from '/imports/ui/pages/user/Login.jsx';
//import CommentsView from '/imports/ui/pages/comments/CommentsView.jsx';
import route from '/imports/routing/router.js';

import React from 'react';
//import Paginator from 'react-paginator';
import { createContainer } from 'meteor/react-meteor-data';
import Posts from '/imports/api/posts/collection.js'
import '/imports/api/posts/methods.js';

class PostsList extends React.Component {
    
    onClickChangeRoute(location) { route.go(location); }

    onLogOut() { 
        Meteor.logout(function(err){ 
          console.log(err + ' uid: ' + Meteor.userId());
        }); 
        route.go('/');       
    }

    onClickDeletePost(id) { 
        Meteor.call('post.remove', id, (err, res) => {
               if(err){
                 alert(err.reason);
                 //throw new Error( err.message);               
               }
               else{
                  alert('Succes Deleting Post');  
                  route.go('/post/list');    
               }
            }) ;
    }

    onClickEditPost(id) { 
       
        route.go('/post/edit/' + id); 
    }
        //route.go('PostEdit',  {postId: id, query: 'string'});}

    onClickSeePost( id ){
        route.go('/post/view/' + id); 
    }

    render() {
        const {loading, posts } = this.props;
       
        //if (  Meteor.userId()) {
        if (loading) {
                return <div>Loading </div>
        }
        return (
                <div>
                    
                    <div className="col-xs-12 col-md-offset-2 col-md-8 text-right">
                      <button className="btn btn-primary topBtn" onClick={_ => this.onClickChangeRoute('/post/create')}>Add Post</button>
                      <button className="btn btn-primary topBtn" onClick={_ => this.onLogOut()}>Log Out</button>   
                    </div>
                    <div className="container">
                      <h2>Posts List </h2>
                      <ul className="list-group">
                        
                            {
                                posts.map(post => {
                                    var cdate = (new Date(post.createdAt)).toLocaleString();
                                    
                                    if(Meteor.userId() != post.userId){
                                        return <li className="list-group-item" key={post._id}>
                                                  <div className="container">
                                                   <div className="col-xs-12 info">
                                                      <span className="col-xs-6 ">{post.title}</span>
                                                      <span className="col-xs-2 post-list-item"> {cdate} </span>
                                                      <div className="post-list-buttons">
                                                        <button className="btn btn-primary editPostBtn" onClick={_ => this.onClickSeePost( post._id )}>
                                                              <i className="fa fa-eye" aria-hidden="true"></i> See Post 
                                                        </button>
                                                      </div>
                                                    </div>
                                                    <div className="col-xs-12" id="postComm{post._id}"></div>
                                                  </div>
                                                    
                                                </li>
                                    }
                                    else{
                                        return <li className="list-group-item" key={post._id}>
                                                  <div className="container">
                                                    <div className="col-xs-12 info">
                                                      <span className="col-xs-6 ">{post.title}</span>
                                                      <span className="col-xs-2 post-list-item"> {cdate} </span>
                                                      <div className="post-list-buttons">
                                                        <button className="btn btn-danger editPostBtn" onClick={_ => this.onClickDeletePost( post._id )}>
                                                                <i className="fa fa-times" aria-hidden="true"></i> Delete
                                                        </button>
                                                        
                                                        <button className="btn btn-warning editPostBtn" onClick={_ => this.onClickEditPost( post._id )}>
                                                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit 
                                                        </button>

                                                        <button className="btn btn-primary editPostBtn" onClick={_ => this.onClickSeePost( post._id )}>
                                                                <i className="fa fa-eye" aria-hidden="true"></i> See Post 
                                                        </button>                                                        
                                                      </div>
                                                    </div>

                                                    <div className="col-xs-12" id="postComm{post._id}"></div>  
                                                  </div>    
                                                </li>
                                    }                                   
                                })
                            }
                        
                      </ul>
                    </div>       
                                  
                </div>
        )
        /*}
        else{
            
            return <div>You need to log in first! <button className="btn btn-primary" onClick={_ => this.onClickChangeRoute('/login')}>Login</button></div>

        }*/
    }
}

export default createContainer(() => {
  const handle = Meteor.subscribe('posts');
  /*var postss =  [];
  Meteor.call('post.list', (err, res) => {
            if (err) {
                console.log('There was an error loading posts: ', err);
                
            } else {
                console.log('Wooho! No Errors loading posts: ');  
                
            }
        });*/
        
return {
            
          loading: !handle.ready() ,
          posts: Posts.find().fetch()
          
      }
}, PostsList);