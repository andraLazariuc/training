import Posts from '/imports/api/posts/collection.js'

//const Schemas = {};

//Schemas.Post = new SimpleSchema({
PostSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    description: {
        type: String,
        label: "Description",
        optional: true,
        max: 1000
    }
});

Posts.attachSchema(PostSchema);

export default PostSchema;