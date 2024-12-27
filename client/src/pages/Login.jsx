import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login=()=>{
    const [UserData,setUserData]=useState({
        email: '',
        password: ''
    })

    const changeInputHandler= (e)=>{
        setUserData(prevState=>{
            return {...prevState , [e.target.name] : e.target.value}
        })
    }
    return (
        <section className="login">
            <div className="container">
                <h2>Sign In</h2>
                <form className="login_form form">
                    <p className="form_error-message">This is the error message</p>
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