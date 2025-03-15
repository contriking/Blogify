import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from 'axios';

// Importing the URL from the .env file
const URL=process.env.VITE_APP_BASE_URL;

const Register=()=>{
    const [UserData,setUserData]=useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const [error,setError]=useState('');
    const navigate = useNavigate();

    const changeInputHandler= (e)=>{
        setUserData(prevState=>{
            return {...prevState , [e.target.name] : e.target.value}
        })
    }

    const registerUser= async(e)=>{
        e.preventDefault();
        setError('');
        try {
            const response= await axios.post(`http://localhost:5000/api/users/register`,UserData); 
            const newUser = await response.data;
            if(!newUser){
                setError("Couldn't register user. Try again.");
            }
            navigate('/login');
        }
        catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <section className="register">
            <div className="container">
                <h2>Sign Up</h2>
                <form className="register_form form" onSubmit={registerUser}>
                    { error && <p className="form_error-message">{error}</p>}
                    <input type="text" placeholder="Full Name" name='name' value={UserData.name} onChange={changeInputHandler}/>
                    <input type="text" placeholder="Email" name='email' value={UserData.email} onChange={changeInputHandler}/>
                    <input type="text" placeholder="Password" name='password' value={UserData.password} onChange={changeInputHandler}/>
                    <input type="text" placeholder="Confirm Password" name='password2' value={UserData.password2} onChange={changeInputHandler}/>

                    <button type="submit" className="btn primary">Register</button>
                </form>
                <small>Already have an account? <Link to='/login'>Sign in</Link> </small>
            </div>
        </section>
    )
}

export default Register