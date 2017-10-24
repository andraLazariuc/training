import React from 'react';

import route from '/imports/routing/router.js';

// Choose your theme
import AutoForm from 'uniforms-unstyled/AutoForm';

// A compatible schema
import PostSchema from '/imports/api/posts/schema.js';

import wrapWithTryCatch from 'react-try-catch-render';
import '/imports/api/posts/methods.js';

export default class PostCreate extends React.Component {
 
	onSubmit = data => {
	   
	    console.log(data);
      Meteor.call('post.create', data, (err, res) => {
             if(err){
               alert(err.reason);
               //throw new Error( err.message);
             }
             else{
                console.log('Succes Adding Post');  
                route.go('/post/list'); //how to reload autoform?                      
             }
          }) 
	};
    render() {
       /* const PostForm = ({model}) =>
            <AutoForm schema={PostSchema} onSubmit={doc => db.save(doc)} model={model} />
        ;*/
       return (

        <div className="col-md-offset-4 col-md-4 col-xs-12 container register-login">
          <div className="panel panel-default">
            <div className="panel-heading text-center"><strong>Add a Post</strong></div>
            <div className="panel-body">
              <AutoForm
                  schema={PostSchema}
                  onSubmit={this.onSubmit}
              />
              
            </div>
          </div>
        </div>
       )
    }
}