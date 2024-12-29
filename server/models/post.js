const mongoose = require('mongoose');

const postSchema=new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        enum: ["Agriculture","Business","Education","Entertainment","Art","Investment","Uncategorized","Weather"],message:"{VALUE is not supported",
    },
    description : {
        type : String,
        required : true,
    },
    thumbnail : {
        type : String,
        required : true,
    },
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
},{timestamps: true});

const Post=mongoose.model('Post',postSchema);

module.exports=Post;