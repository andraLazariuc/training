import React from 'react';
import AutoForm from 'uniforms-unstyled/AutoForm';

import route from '/imports/routing/router.js';
import LoginSchema from '/imports/schemas/LoginSchema';

export default class Login extends React.Component {
  onClickRegister(location) {
    route.go(location);
  }

  onSubmit = data => {
    Meteor.loginWithPassword(data.email, data.password, function(err, res) {
      if (err) {
        console.log('There was an error: ', err);
      } else {
        console.log('Wooho! No Errors');
        //route.go("/post/list");
        route.go('/');
      }
    });
  };

  render() {
    return (
      <div className="col-md-offset-4 col-md-4 col-xs-12 container register-login">
        <div className="panel panel-default">
          <div className="panel-heading text-center">
            <strong>Login</strong>
          </div>
          <div className="panel-body">
            <AutoForm schema={LoginSchema} onSubmit={this.onSubmit} />
            <button
              className="btn btn-primary"
              onClick={_ => this.onClickRegister('/register')}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}
