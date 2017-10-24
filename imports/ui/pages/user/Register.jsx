
import React from 'react';

import route from '/imports/routing/router.js';

// Choose your theme
import AutoForm from 'uniforms-unstyled/AutoForm';

// A compatible schema
import {RegisterSchema} from '/imports/schemas/RegisterSchema';

import wrapWithTryCatch from 'react-try-catch-render'

class MyErrorHandler extends React.Component {
    render(){
        return (
            <div className="terrible-error">{this.props.error}</div>
        );
    }
}

 class Register extends React.Component {
	onSubmit = data => {	   
	    //console.log(data);

     Meteor.call('user.register', data, (err, res) => {
        if(err){
          alert(err.reason);
          //throw new Error( err.message);
        }
        // Why not create user here -> automatic log in???
        else{
          console.log('succes Register');
          Meteor.loginWithPassword(data.email, data.password2, (err, res) => {
            if(err){
              alert('Error loggin in: '+ err.reason);
              route.go('/login');
              //throw new Error( err.message);
            }else{
               console.log('Logged in');
               route.go('/');
            }
          });
         
        }
     })    
	};
    render() {
       return (
        <div className="col-md-offset-4 col-md-4 col-xs-12 container register-login">
          <div className="panel panel-default">
            <div className="panel-heading text-center"><strong>Register</strong></div>
            <div className="panel-body">
              <AutoForm
                  schema={RegisterSchema}
                  onSubmit={this.onSubmit}
              />
              
            </div>
          </div>
        </div>
       )
    }
}

export default wrapWithTryCatch(React, MyErrorHandler, {error: "Error while creating user account: "})(Register);