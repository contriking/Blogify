import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register=()=>{
    const [UserData,setUserData]=useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const changeInputHandler= (e)=>{
        setUserData(prevState=>{
            return {...prevState , [e.target.name] : e.target.value}
        })
    }
    return (
        <section className="register">
            <div className="container">
                <h2>Sign Up</h2>
                <form className="register_form form">
                    <p className="form_error-message">This is the error message</p>
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