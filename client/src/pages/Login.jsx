import React, { useState , useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../context/userContext";


const Login=()=>{
    const [UserData,setUserData]=useState({
        email: '',
        password: ''
    })

    const [error,setError]=useState('');
    const navigate = useNavigate();

    const {setCurrUser} = useContext(UserContext);

    const changeInputHandler= (e)=>{
        setUserData(prevState=>{
            return {...prevState , [e.target.name] : e.target.value}
        })
    }

    const loginUser= async(e)=>{
        e.preventDefault();
        setError('');
        try {
            const response= await axios.post(`http://localhost:5000/api/users/login`,UserData);
            const user=await response.data;
            setCurrUser(user);
            navigate('/');
        } catch (err) {
            setError(err.response.data.message);
        }
    }

    return (
        <section className="login">
            <div className="container">
                <h2>Sign In</h2>
                <form className="login_form form" onSubmit={loginUser}>
                    { error &&  <p className="form_error-message">{error}</p>}
                    <input type="text" placeholder="Email" name='email' value={UserData.email} onChange={changeInputHandler} autoFocus/>
                    <input type="text" placeholder="Password" name='password' value={UserData.password} onChange={changeInputHandler}/>
                    
                    <button type="submit" className="btn primary">Login</button>
                </form>
                <small>Don't have an account? <Link to='/register'>Sign up</Link> </small>
            </div>
        </section>
    )
}

export default Login