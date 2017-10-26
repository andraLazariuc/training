import { Meteor } from 'meteor/meteor';
import Comments from '/imports/api/comments/collection'; 
//import Security from '/imports/api/security.js';


Meteor.publish('comments', function () {
    return Comments.find();
})

