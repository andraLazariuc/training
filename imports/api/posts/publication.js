import { Meteor } from 'meteor/meteor';
import Posts from '/imports/api/posts/collection'; 
//import Security from '/imports/api/security.js';


Meteor.publish('posts', function () {
    return Posts.find();
})

/*Meteor.publish('posts', function () {
    let filters = {};
    if (!Security.hasRole(this.userId, 'ADMIN')) {
        // if the user is not an admin, we only show posts with "isPublic" true
        filters.isPublic = true;
    }
    
    return Posts.find(filters);
})*/