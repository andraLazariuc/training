import Login from '/imports/ui/pages/user/Login.jsx';
import route from '/imports/routing/router.js';

import React from 'react';
//import Paginator from 'react-paginator';
//import { createContainer } from 'meteor/react-meteor-data';
import Posts from '/imports/api/posts/collection.js'
import '/imports/api/posts/methods.js';

export default class PostsList extends React.Component {
    constructor() {
        super();
        this.state = {loading: true, posts: []};
      
    }
   
    componentDidMount() {
        Meteor.call('post.list', (err, res) => {
            if (err) {
                console.log('There was an error loading posts: ', err);
                // in err object you have to (err.error, err.reason, err.details)
            } else {
                console.log('Wooho! No Errors loading posts');
                this.setState({
                               loading: false,
                               posts: res // assuming the method returns an array of donuts                              
                })
            }
        })
    }
    
    onClickChangeRoute(location) { route.go(location); }

    onClickEditPost(id) { 
        console.log('/post/edit/' + id);
        route.go('/post/edit/' + id); 
    }
        //route.go('PostEdit',  {postId: id, query: 'string'});}

    render() {

        if (  Meteor.userId()) {
            if (this.state.loading) {
                return <div>Loading </div>
            }
            return (
                <div>
                    <p className="text-right">Logged In  </p>
                    <div className="container">
                      <h2>Posts List </h2>
                      <ul className="list-group">
                        
                            {
                                this.state.posts.map(post => {
                                    var cdate = (new Date(post.createdAt)).toLocaleString();
                                    //var id = parseInt(post._id);
                                    return <li className="list-group-item" key={post._id}>
                                               
                                                {post.title}
                                                <span className="post-list-item"> {cdate} </span>
                                                <button className="btn btn-primary editPostBtn" onClick={_ => this.onClickEditPost( post._id )}>
                                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit 
                                                </button>
                                            </li>
                                })
                            }
                        
                      </ul>
                    </div>                     
                </div>
                )
           
                    /*<button className="btn btn-primary" onClick={_ => this.onClickChangeRoute('/add_donut')}>Add Donut</button> */
        }
        else{
            
            return <div>You need to log in first! <button className="btn btn-primary" onClick={_ => this.onClickChangeRoute('/login')}>Login</button></div>

        }
    }
}