import { Meteor } from 'meteor/meteor';
import Comments from '/imports/api/comments/collection.js';
import Security from '/imports/api/security.js';

Meteor.methods({
	'comment.add': function (comment) {
		
		if (Meteor.userId()){
			
			Comments.insert(comment);
		}
	}
})

Meteor.methods({
    'comment.list': function (postId) {
       return Comments.find({ postId: postId}).fetch();
    }
})

Meteor.methods({
    'comment.get': function (id) {
       return Comments.findOne({_id : id});
    }
})

Meteor.methods({
    'comment.remove': function (id) {
    	if (Meteor.call('comment.check_owner', id)){
       		return Comments.remove({_id : id}, (err, res) => {
				if (err) {
					throw new Meteor.Error(403, 'There was an error while deleting the comment: ' + err);
				} else {
					console.log('Wooho! No Errors deleting comment  ' );
					return true;
				}
			});
       	}
    }
})

Meteor.methods({
    'comment.check_owner': function (id) {
        var comment = Meteor.call('comment.get', id);
		if(Meteor.userId() != comment.userId){
			throw new Meteor.Error(403, "Not matching user ids! You are not allowed to edit another user's comment!");
		} else{
			return true;
		}
    }
})