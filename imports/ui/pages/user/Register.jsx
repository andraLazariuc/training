import React from 'react';
import AutoForm from 'uniforms-unstyled/AutoForm';
import wrapWithTryCatch from 'react-try-catch-render';

import route from '/imports/routing/router.js';
import RegisterSchema from '/imports/schemas/RegisterSchema';

class MyErrorHandler extends React.Component {
  render() {
    return <div className="terrible-error">{this.props.error}</div>;
  }
}
class Register extends React.Component {
  onSubmit = (data) => {
    Meteor.call('user.register', data, (err, res) => {
      if (err) {
        alert(err.reason);
        // throw new Error( err.message);
      } else {
        Meteor.loginWithPassword(data.email, data.password2, (err, res) => {
          if (err) {
            alert(`Error loggin in: ${err.reason}`);
            route.go('/login');
            // throw new Error( err.message);
          } else {
            route.go('/');
          }
        });
      }
    });
  };

  render() {
    return (
      <div className="col-md-offset-4 col-md-4 col-xs-12 container register-login">
        <div className="panel panel-default">
          <div className="panel-heading text-center">
            <strong>Register</strong>
          </div>
          <div className="panel-body">
            <AutoForm schema={RegisterSchema} onSubmit={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default wrapWithTryCatch(React, MyErrorHandler, {
  error: 'Error while creating user account: ',
})(Register);
