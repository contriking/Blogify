const Post = require('../models/post');
const User = require('../models/User');
const HttpError = require('../models/Error');
const cloudinary = require('../utils/cloudinary.js')
const {extractor} = require('../utils/pidExtractor.js')

// Create a Post
// POST :api/posts
// Protected
const createPost=async (req,res,next)=>{
    try {
        
        let {title,category,description,thumbnail} = req.body;
        if(!title || !category || !description || !thumbnail){
            return next(new HttpError("Please fill in all fields and choose thumbnail.",422));
        }
        
        // Check file size
        if(thumbnail.size > 2000000){
            return next(new HttpError("Thumbnail too big. File should be less than 2mb.",422))
        }

        const uploadResponse=await cloudinary.uploader.upload(thumbnail,{folder:"Blogify"});
        const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail:uploadResponse.secure_url,
            creator: req.user.id
        });

        if(!newPost){
            return next(new HttpError("Post couldn't be created.",422));
        }
        // Find the User and increase it's count by 1
        const currUser=await User.findById(req.user.id);
        const UserPostCount = currUser.posts + 1;
        await User.findByIdAndUpdate(
            req.user.id, 
            {posts : UserPostCount}
        );

        res.status(201).json(newPost);

    } catch (error) {
        return next(new HttpError(error));
    }
}


// Get all Posts
// Get :api/posts
// UnProtected
const getPosts=async (req,res,next)=>{
    try {
       
        const posts=await Post.find().sort({updatedAt: -1});
        res.status(200).json(posts);

    } catch (error) {
        return next(new HttpError(error));
    }
}


// Get a single post
// Get :api/posts/:id
// UnProtected
const getPost=async (req,res,next)=>{
    try {
       
        const postId=req.params.id;
        const post= await Post.findById(postId);
        if(!post){
            return next(new HttpError("Post not found.",422));
        }
        res.status(200).json(post);

    } catch (error) {
        return next(new HttpError(error)); 
    }
}


// Create Posts by Category
// Get :api/posts/categories/:category
// UnProtected
const getCatPosts=async (req,res,next)=>{
    try {

        const {category}=req.params;
        const catPosts = await Post.find({category}).sort({createdAt: -1});
        res.status(200).json(catPosts);

    } catch (error) {
        return next(new HttpError(error));
    }
}

// Get Author Post
// Get :api/posts/users/:id
// UnProtected
const getUserPosts=async (req,res,next)=>{
    try {

        const {id}=req.params;
        const posts=await Post.find({creator: id}).sort({createdAt: -1});
        res.status(200).json(posts);

    } catch (error) {
        return next(new HttpError(error));
    }
}

// Edit Posts
// Patch :api/posts/:id
// Protected
const editPost=async (req,res,next)=>{
    try {
      
        let updatedPost;
        const postId=req.params.id;
        
        let {title,category,description}=req.body;
        // ReactQuill has a paragraph opening and closing tag with break tag in between so there are 11 characters in there already.
        if(!title || !category || description.length < 12 ){
            return next(new HttpError("Please fill all the fields",422))
        }

        const post=await Post.findById(postId);
        if(!post){
            return next(new HttpError("Post not found.",422));
        }

        if(req.user.id !== post.creator.toString()){
            return next(new HttpError("You are not authorized to edit this post.",401));
        }
    
        // If we don't have to update the thumbnail.
        if(!req.body.thumbnail){
            updatedPost=await Post.findByIdAndUpdate(postId,{title,category,description},{new : true});
        }
        else{
            // Get old post from the database
            const oldPost= await Post.findById(postId);
            if(!oldPost){
                return next(new HttpError("Post not found.",422));
            }
            
            // Delete the old thumbnail
            const public_ID=extractor(oldPost.thumbnail);
            cloudinary.uploader.destroy(`Blogify/${public_ID}`);

            // Update new thumbnail
            const { thumbnail }=req.body;
            // Check file size
            if(thumbnail.size > 2000000){
                return next(new HttpError("Thumbnail size is too big. Should be less than 2mb.",422));
            }
            
            const uploadResponse=await cloudinary.uploader.upload(thumbnail,{folder: "Blogify"})
            updatedPost=await Post.findByIdAndUpdate(
                postId,
                {title,category,description,thumbnail:uploadResponse.secure_url},
                {new: true}
            );
        }
        if(!updatedPost){
            return next(new HttpError("Post couldn't be updated.",422));
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        return next(new HttpError(error));
    }
}

// Delete Post
// Delete :api/posts/:id
// Protected
const deletePost=async (req,res,next)=>{
    try {
       
        const postId=req.params.id;
        if(!postId){
            return next(new HttpError("Post not found.",400));
        }
        const post=await Post.findById(postId);

        if(req.user.id !==post.creator.toString()){
            return next(new HttpError("You are not authorized to delete this post.",401));
        }

        // Delete the thumbnail
        const public_ID = extractor(post?.thumbnail);
        cloudinary.uploader.destroy(`Blogify/${public_ID}`);

        await Post.findByIdAndDelete(postId);
        // Find the User and decrease it's count by 1
        const currUser=await User.findById(req.user.id);
        const UserPostCount= currUser.posts - 1;
        await User.findByIdAndUpdate(req.user.id,{posts: UserPostCount});

        res.json(`Post ${postId} deleted successfully.`);
    } catch (error) {
        return next(new HttpError(error));
    }
}

module.exports={
                createPost,
                getPosts,
                getPost,
                getCatPosts,
                getUserPosts,
                editPost,
                deletePost
};
