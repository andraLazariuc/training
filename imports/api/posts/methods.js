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
	'post.edit': function (id, data) { 
		if (Meteor.call('post.check_owner', id)){
			Posts.update(id, data, (errUpdate, resUpdate) => {
				if (errUpdate) {
					console.log('There was an error updating post: ' + errUpdate);
				} else {
					console.log('Wooho! No Errors updating post : ' );
				}
			});
			console.log(data);
		}
		/*var post = Meteor.call('post.get', id);
		if(Meteor.userId() != post.userId){
			throw new Meteor.Error(403, "Not matching user ids! You are not allowed to edit another user's post!");
		} else{
			Posts.update(id, data, (errUpdate, resUpdate) => {
				if (errUpdate) {
					console.log('There was an error updating post: ', errUpdate);
				} else {
					console.log('Wooho! No Errors updating post : ' );
				}
			});
			console.log(data);
		}*/

		/*Meteor.call('post.get', id, (err, res)=> {
			if(err){
				throw new Meteor.Error(403, "Can't find this post in the database: invalid post id!");
			}
			else{
				console.log(res);
				if(Meteor.userId() != res.userId){
					throw new Meteor.Error(403, "Not matching user ids! You are not allowed to edit another user's post!");
				}
				else{
					Posts.update(id, data, (errUpdate, resUpdate) => {
						if (errUpdate) {
							console.log('There was an error updating post: ', errUpdate);
    					              // in err object you have to (err.error, err.reason, err.details)
    					} else {
    					    console.log('Wooho! No Errors updating post : ' );
    					}
    				});
					console.log(data);
				}
			}    		     	
    	}); */
	}
})

Meteor.methods({
    'post.remove': function (id) {
    	if (Meteor.call('post.check_owner', id)){
       		return Posts.remove({_id : id}, (err, res) => {
				if (err) {
					throw new Meteor.Error(403, 'There was an error while deleting the post: ' + err);
				} else {
					console.log('Wooho! No Errors deleting post : ' );
					return true;
				}
			});
       	}
    }
})

Meteor.methods({
    'post.check_owner': function (id) {
        var post = Meteor.call('post.get', id);
		if(Meteor.userId() != post.userId){
			throw new Meteor.Error(403, "Not matching user ids! You are not allowed to edit another user's post!");
		} else{
			return true;
		}
    }
})