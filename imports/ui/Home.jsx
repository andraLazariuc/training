import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import route from '/imports/routing/router.js';

class Home extends React.Component {
  onLogOut() {
    Meteor.logout((err) => {
      console.log(`${err} uid: ${Meteor.userId()}`);
    });
  }

  onClickChangeRoute(location) {
    route.go(location);
  }

  render() {
    const { userId } = this.props;

    if (userId) {
      return (
        <div>
          <p className="text-center">Logged In </p>
          <div className="text-center">
            <button className="btn btn-primary" onClick={() => this.onLogOut()}>
              Log Out
            </button>

            <button
              className="btn btn-primary"
              onClick={() => this.onClickChangeRoute('/post/create')}
            >
              Add Post
            </button>

            <button
              className="btn btn-primary"
              onClick={() => this.onClickChangeRoute('/post/list')}
            >
              Posts List
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        You need to log in first!{' '}
        <button
          className="btn btn-primary"
          onClick={() => this.onClickChangeRoute('/login')}
        >
          Login
        </button>
      </div>
    );
  }
}

export default createContainer(
  () => ({
    userId: Meteor.userId(),
  }),
  Home,
);
