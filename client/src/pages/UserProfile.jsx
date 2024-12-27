import React, { useState , useEffect , useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

import { UserContext } from "../context/userContext";
import axios from "axios";


const UserProfile=()=>{
    const [avatar,setAvatar]=useState('');
    const [name,setName] =useState('');
    const [email,setEmail] =useState('');
    const [currentPassword,setCurrentPassword] =useState('');
    const [newPassword,setNewPassword] =useState('');
    const [confireNewPassword,setConfireNewPassword] =useState('');
    const [error,setError]=useState('')

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
            const response=await axios.get(`${process.env.VITE_APP_BASE_URL}/users/${currUser.id}`,
                {withCredentials: true , headers : {Authorization: `Bearer ${token}`}}
            )
            const {name,email,avatar}=response.data;
            setName(name);
            setEmail(email);
            setAvatar(avatar);
        }
        getUser();
    },[])


    const changeAvatarHandler= async ()=>{
        setIsAvatar(false);
        try {
            const postData = new FormData();
            postData.set('avatar',avatar)
            const response = await axios.post(`${process.env.VITE_APP_BASE_URL}/users/change-avatar`,postData,
                {withCredentials: true, headers: { Authorization: `Bearer ${token}`}}
            )
            setAvatar(response?.data.avatar);
            console.log(avatar)
        } catch (error) {
            console.log(error);
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
            const response= await axios.patch(`${process.env.VITE_APP_BASE_URL}/users/edit-user`,userData,
                {withCredentials: true, headers: {Authorization: `Bearer ${token}`}}
            )
        
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

                <div className="profile_details">
                        <div className="avatar_wrapper">
                            <div className="profile_avatar">
                                <img src={`${process.env.VITE_APP_ASSETS_URL}/uploads/${avatar}`} alt="" />
                            </div>
                            {/* Form to update avatar */}
                        <form className="avatar_form">
                            <input type="file" name="avatar" id="avatar" onChange={e => setAvatar(e.target.files[0])}
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