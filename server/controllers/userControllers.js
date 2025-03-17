const HttpError = require("../models/Error.js");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cloudinary =require('../utils/cloudinary.js');
const { extractor } = require('../utils/pidExtractor.js');

// Register a new user
// POST : api/users/register
// Unprotected
const registerUser= async(req,res,next)=>{
    try {
        
        const {name,email,password,password2}=req.body;
        if(!name || !email || !password || !password2){
            return next(new HttpError("Please fill in all fields.",422));
        }
        const newEmail=email.toLowerCase();
        const emailExists=await User.findOne({email:newEmail});
        if(emailExists){
            return next(new HttpError("Email already exists.",422));
        }
        if((password.trim()).length < 6){
            return next(new HttpError("Password Should be atleast 6 characters long.",422));
        }

        if(password!==password2){
            return next(new HttpError("Password do not match.",422));
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=await User.create({
            name,
            email:newEmail,
            password:hashedPassword,
        })

        res.status(201).json(`New User ${ newUser.email} registered successfully.`);

    } catch (error) {
        return next(new HttpError("Registration failed.",422));
    }
}




// Login a registered user
// POST : api/users/login
// Unprotected
const loginUser=async(req,res,next)=>{
    try {
       
        const {email,password}=req.body;
        if(!email || !password){
            return next(new HttpError("Please fill all fields.",422));
        }
        const newEmail=email.toLowerCase();
        const user=await User.findOne({email:newEmail});
        if(user.length === 0){
            return next(new HttpError("Invalid credentials.",422));
        }
        const isMAtch=await bcrypt.compare(password,user.password);
        if(!isMAtch){
            return next(new HttpError("Invalid Credentials.",422));
        }
        const { _id: id , name} = user;
        const token=jwt.sign({id,name}, process.env.JWT_SECRET,{expiresIn: "1d"});
        res.status(200).json({token,id,name});
        
    } catch (error) {
        return next(new HttpError("Login failed.",422));
    }
}

// UserProfile
// Get : api/users/:id
// Protected
const getUser=async(req,res,next)=>{
    try {
       
        const {id}=req.params;
        const user= await User.findById(id).select("-password");

        if(!user){
            return next(new HttpError("User not available.",404));
        }
        
        res.status(200).json(user);
    } catch (error) {
        return next(new HttpError(error));
    }
}

// Change user Avatar
// POST : api/users/change-avatar
// Protected
const changeAvatar=async(req,res,next)=>{
    try {

        if(!req.body.avatar){
            return next(new HttpError("Please choose an image.",422));
        }

        // Find user from database
        const user=await User.findById(req.user.id);
        // delete old avatar
        if(user.avatar){
            
            const public_ID = extractor(user.avatar);
            cloudinary.uploader.destroy(`Blogify/${public_ID}`);
        }

        const {avatar}=req.body;
        // Check file size
        if(avatar.size > 500000){
            return next(new HttpError("Proflie pictuer too big. Should be less than 500kb"),422);
        }

        const uploadResponse = await cloudinary.uploader.upload(avatar,{folder: "Blogify"});
        const updatedUser=await User.findByIdAndUpdate(
            req.user.id,
            {avatar:uploadResponse.secure_url},
            {new: true}
        ).select('-password')

        if(!updatedUser){
            return next(new HttpError("Avatar could not be updated",422));
        }        

        res.status(200).json(updatedUser);

    } catch (error) {
        return next(new HttpError(error));
    }
}

// Edit user detals
// POST : api/users/edit-user
// Protected
const editUser=async(req,res,next)=>{
    try {
      
        const {name,email,password,newPassword,confirmNewPassword}=req.body;
        if(!name || !email || !password || !newPassword){
            return next(new HttpError("Please fill in all fields.",422));
        }
        
        // get current User from database
        const user= await User.findById(req.user.id);
        if(!user){
            return next(new HttpError("User not found.",403));
        }

        // make sure the new email is not already taken
        const emailExists=await User.findOne({email:email});
        if(emailExists && (emailExists._id != req.user.id)){
            return next(new HttpError("Email already exists.",422));
        }
        
        const validateUserPassword=await bcrypt.compare(password,user.password);
        if(!validateUserPassword){
            return next(new HttpError("Invalid current Password.",422));
        }

        // Compare new Password
        if(newPassword!==confirmNewPassword){
            return next(new HttpError("New Password does not match.",422));
        }

        // hash new Password
        const salt= await bcrypt.genSalt(10);
        const hash= await bcrypt.hash(newPassword,salt);

        // new returns the newly updated info.
        const newInfo=await User.findByIdAndUpdate(req.user.id,{name,email,password:hash},{new:true});
        res.status(200).json(newInfo);


    } catch (error) {
        return next(new HttpError(error));
    }
}

//Get Authors
// GET : api/users/authors
// Unprotected
const getAuthors=async(req,res,next)=>{
    try {
     
        const authors= await User.find().select('--password');
        res.json(authors);
    } catch (error) {
        return next(new HttpError(error));
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getAuthors,
    changeAvatar,
    editUser,
}