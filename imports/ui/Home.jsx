import Login from '/imports/ui/pages/user/Login.jsx';
import route from '/imports/routing/router.js';

import React from 'react';
//import Paginator from 'react-paginator';
import { createContainer } from 'meteor/react-meteor-data';


 class Home extends React.Component {
  
    onLogOut() { 
        Meteor.logout(function(err){ 
          console.log(err + ' uid: ' + Meteor.userId());
        }); 
       
    }

    onClickChangeRoute(location) { route.go(location); }

    render() {
        const { userId } = this.props;

        if ( userId) {
           
            return (
                <div>
                    <p className="text-center">Logged In </p>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={_ => this.onLogOut()}>Log Out</button>

                        <button className="btn btn-primary" onClick={_ => this.onClickChangeRoute('/post/create')}>Add Post</button>

                        <button className="btn btn-primary" onClick={_ => this.onClickChangeRoute('/post/list')}>Posts List</button>
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
  return {
    userId: Meteor.userId()
  };
}, Home);