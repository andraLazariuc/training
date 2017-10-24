import { Meteor } from 'meteor/meteor';
import Posts from '/imports/api/posts/collection.js';
import Security from '/imports/api/security.js';

Meteor.methods({
    'post.create': function (post) {
            return Posts.insert(post);
        }
})

Meteor.methods({
    'post.list': function () {
       return Posts.find().fetch();
    }
})

Meteor.methods({
    'post.get': function (id) {
       return Posts.findOne({_id : id});
    }
})

Meteor.methods({
    'post.edit': function (data) {
    	console.log(data.userId);
    	if(Meteor.userId() != data.userId){
    		throw new Meteor.Error(403, "Not matching user ids! You are not allowed to edit another user's post!");
    	}
    	else{
    		console.log(data);
    	}
       //return Posts.findOne({_id : id});
    }
})