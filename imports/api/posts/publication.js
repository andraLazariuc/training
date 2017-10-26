import { Meteor } from 'meteor/meteor';
import Posts from '/imports/api/posts/collection'; 
//import Security from '/imports/api/security.js';


Meteor.publish('posts', function () {
    return Posts.find();
})

