import React, { useContext , useEffect}  from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";

const Logout=()=>{
    const { setCurrUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        setCurrUser(null);
        navigate('/login');
    },[setCurrUser,navigate]);

    return (
        <></>
    )
}

export default Logout