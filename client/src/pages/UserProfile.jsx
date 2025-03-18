import React, { useState , useEffect , useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import profilePic from '../images/avatar.png'
import { UserContext } from "../context/userContext";
import axios from "axios";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";

const UserProfile=()=>{
    const [avatar,setAvatar]=useState('');
    const [name,setName] =useState('');
    const [email,setEmail] =useState('');
    const [currentPassword,setCurrentPassword] =useState('');
    const [newPassword,setNewPassword] =useState('');
    const [confireNewPassword,setConfireNewPassword] =useState('');
    const [error,setError]=useState('');
    const [selectedImg,setSelectedImg]=useState(null);
    const [imageError,setImageError]=useState('')

    const [isAvatar,setIsAvatar]=useState(false);

    const { currUser } = useContext(UserContext);
    const token = currUser?.token;
    const navigate = useNavigate(); 

    useEffect(()=>{
      if(!token){
        navigate('/login');
      }
    },[])

    useEffect(()=>{
        const getUser=async ()=>{
            const response=await axiosInstance.get(`/users/${currUser.id}`,
                {withCredentials: true , headers : {Authorization: `Bearer ${token}`}}
            )
            const {name,email,avatar}=response.data;
            setName(name);
            setEmail(email);
            setAvatar(avatar);
        }
        getUser();
    },[])

    const setImage=async(e)=>{
        const file= e.target.files[0];
        if(!file){
          return;
        }
    
        const reader = new FileReader();
        
        reader.readAsDataURL(file);
    
        reader.onload= async ()=>{
            const base64Image= reader.result;
            setSelectedImg(base64Image);
        }
    }

    const changeAvatarHandler= async ()=>{
        setIsAvatar(false);
        try {
            setImageError('');
            if(selectedImg!==null){
                // const postData = new FormData();
                // postData.set('avatar',selectedImg)
                const id=toast.loading("Please wait...")

                const response = await axiosInstance.post(
                    `/users/change-avatar`,
                    {
                        'avatar':selectedImg
                    },
                    {withCredentials: true, headers: { Authorization: `Bearer ${token}`}}
                ).then(res=>{
                    setAvatar(res?.data.avatar);
                    toast.update(id,{render:"Profile picture changed successfully.",type:"success",isLoading:false,autoClose:2000});
                }).catch(err=>{
                    toast.update(id,{render:"Profile could not be updated.",type:"error",isLoading:false,autoClose:2000});
                })
                
            }
            else{
                setImageError('Please select an image.')
            }
            
        } catch (error) {
            toast.update(id,{render:"Profile could not be updated.",type:"error",isLoading:false,autoClose:2000});
            setImageError(error.response.data.message);
        }
    }

    const updateUserDetail=async(e)=>{
        e.preventDefault();
        
        const userData=new FormData();
        userData.set('name',name)
        userData.set('email',email)
        userData.set('password',currentPassword)
        userData.set('newPassword',newPassword)
        userData.set('confirmNewPassword',confireNewPassword)

        try {
            const response= await axiosInstance.patch(
                `/users/edit-user`,
                {
                    'name':name,
                    'email':email,
                    'password':currentPassword,
                    'newPassword':newPassword,
                    'confirmNewPassword':confireNewPassword,
                },
                {withCredentials: true, headers: {Authorization: `Bearer ${token}`}}
            )
            toast.success("User detail updated.")
            if(response.status==200){
               // Log user Out
               navigate('/logout');
            }
        }
        catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <section className="profile">
            <div className="container profile_container">
                <Link to={`/myposts/${currUser.id}`} className="btn">My Posts</Link>
                {imageError && <p className="form_error-message">{imageError}</p>}
                <div className="profile_details">
                    <div className="avatar_wrapper">
                        <div className="profile_avatar">
                            <img src={selectedImg || avatar || profilePic } alt="Profile" />
                        </div>
                        {/* Form to update avatar */}
                        <form className="avatar_form">
                            <input type="file" name="avatar" id="avatar" onChange={setImage}
                            accept="jpg , png , jpeg" />
                            <label htmlFor="avatar" onClick={()=> setIsAvatar(true)}><FaEdit /></label>
                        </form>
                        {isAvatar && <button className="profile_avatar-btn" onClick={changeAvatarHandler}><FaCheck /></button>}
                    </div>
                    <h1>{currUser.name}</h1>

                    {/* Form to update user details */}
                    <form className="form profile_form" onSubmit={updateUserDetail}>
                        {error && <p className="form_error-message">{error}</p>}
                        <input type="text" placeholder="Full Name" value={name} onChange={e=> setName(e.target.value)}/>
                        <input type="email" placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/>
                        <input type="password" placeholder="password" value={currentPassword} onChange={e=> setCurrentPassword(e.target.value)}/>
                        <input type="password" placeholder="New Password" value={newPassword} onChange={e=> setNewPassword(e.target.value)}/>
                        <input type="password" placeholder="Confirm new password" value={confireNewPassword} onChange={e=> setConfireNewPassword(e.target.value)}/>
                        <button type="submit" className="btn primary">Update Password</button>
                    </form>
                </div>
            </div>
        </section>
        
    )
}

export default UserProfile