import React, { useState , useContext } from 'react'
import {Link} from 'react-router-dom'
import logo from '../images/logo.png'
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import { UserContext } from '../context/userContext';

const Header = () => {
  const [isNavVisible,setIsNavVisible]=useState(window.innerWidth > 800 ? true : false);
  const { currUser } = useContext(UserContext);
  
  const closeNavHandler=()=>{
    if(window.innerWidth < 800 ){
      setIsNavVisible(false);
    }
    else{
      setIsNavVisible(true);
    }
  } 
  return (
   <nav>
      <div className="container nav_container">
        <Link to='/' className='nav_logo' >
          <img src={logo} alt="Logo" onClick={closeNavHandler} />
        </Link>
        {!currUser && isNavVisible && <ul className="nav_menu">
          <li><Link to='/authors' onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to='/login' onClick={closeNavHandler}>Login</Link></li>
          <li><Link to='/register' onClick={closeNavHandler}>Register</Link></li>
        </ul>}
        {currUser && isNavVisible && <ul className="nav_menu">
          <li><Link to={`/profile/${currUser.id}`} onClick={closeNavHandler}>{currUser?.name}</Link></li>
          <li><Link to='/create' onClick={closeNavHandler}>Create Post</Link></li>
          <li><Link to='/authors' onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to='/logout' onClick={closeNavHandler}>Logout</Link></li>
        </ul>}
        
        <button className="nav_toggle-btn" onClick={()=> setIsNavVisible(!isNavVisible)}>
          {isNavVisible ? <AiOutlineClose/> : <FaBars/>}
        </button>
      </div>
   </nav>
  )
}

export default Header