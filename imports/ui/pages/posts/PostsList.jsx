import Login from '/imports/ui/pages/user/Login.jsx';
import route from '/imports/routing/router.js';

import React from 'react';
//import Paginator from 'react-paginator';
import { createContainer } from 'meteor/react-meteor-data';
import Posts from '/imports/api/posts/collection.js'
import '/imports/api/posts/methods.js';

class PostsList extends React.Component {
    /*constructor() {
        super();
        this.state = {loading: true, posts: []};      
    }
   
    componentDidMount() {
        Meteor.call('post.list', (err, res) => {
            if (err) {
                console.log('There was an error loading posts: ', err);
            } else {
                console.log('Wooho! No Errors loading posts');
                this.setState({
                               loading: false,
                               posts: res              
                })
            }
        })
    }
    */
    onClickChangeRoute(location) { route.go(location); }

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
        //console.log('/post/edit/' + id);
        route.go('/post/edit/' + id); 
    }
        //route.go('PostEdit',  {postId: id, query: 'string'});}

    render() {
        const {loading, posts } = this.props;
       
        if (  Meteor.userId()) {
            if (loading) {
                return <div>Loading </div>
            }
            return (
                <div>
                    <p className="text-right">Logged In  </p>
                    <div className="container">
                      <h2>Posts List </h2>
                      <ul className="list-group">
                        
                            {
                                posts.map(post => {
                                    var cdate = (new Date(post.createdAt)).toLocaleString();
                                    //var id = parseInt(post._id);
                                    if(Meteor.userId() != post.userId){
                                        return <li className="list-group-item" key={post._id}>
                                                   
                                                    {post.title}
                                                    <span className="post-list-item"> {cdate} </span>
                                                    
                                                </li>
                                    }
                                    else{
                                        return <li className="list-group-item" key={post._id}>
                                                   
                                                    {post.title}
                                                    <span className="post-list-item"> {cdate} </span>
                                                    
                                                    <button className="btn btn-primary editPostBtn" onClick={_ => this.onClickEditPost( post._id )}>
                                                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit 
                                                    </button>

                                                    <button className="btn btn-danger editPostBtn" onClick={_ => this.onClickDeletePost( post._id )}>
                                                            <i className="fa fa-times" aria-hidden="true"></i> Delete
                                                    </button>
                                                    
                                                </li>
                                    }
                                   
                                })
                            }
                        
                      </ul>
                    </div>                     
                </div>
                )
        }
        else{
            
            return <div>You need to log in first! <button className="btn btn-primary" onClick={_ => this.onClickChangeRoute('/login')}>Login</button></div>

        }
    }
}

export default createContainer(() => {
  const handle = Meteor.subscribe('posts');
  var postss =  [];
  Meteor.call('post.list', (err, res) => {
            if (err) {
                console.log('There was an error loading posts: ', err);
                
            } else {
                console.log('Wooho! No Errors loading posts: ');  
                
            }
        });
        
return {
            
          loading: !handle.ready() ,
          posts: Posts.find().fetch()
          
      }
}, PostsList);