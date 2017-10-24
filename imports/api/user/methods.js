import { Meteor } from 'meteor/meteor';
//import Donuts from '/imports/api/donuts/collection';
import Security from '/imports/api/security.js';
import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
    'user.register': function (data) { 
    	if(Accounts.findUserByEmail(data.email) != null){
    		throw new Meteor.Error(403, "There is already an account with this email! ");
    	}
    	else{
    		if (data.password1 != data.password2) {
    			throw new Meteor.Error(403, "Passwords don't match");
    		} else {
    			const userId = Accounts.createUser({  email: data.email, password: data.password2 });
	    		if(userId != ''){
	    		  	return true;
	    		  }
	    		  else{
	    		  	throw new Meteor.Error(403, "Can't create user");
	    		  }    		  
    		}
    	}
        
    }
})