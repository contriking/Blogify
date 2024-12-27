import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import logo from '../images/logo.jpg'
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [isNavVisible,setIsNavVisible]=useState(window.innerWidth > 800 ? true : false);
  
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
        { isNavVisible && <ul className="nav_menu">
          <li><Link to='/profile/sdfsdf' onClick={closeNavHandler}>Prashant Sahu</Link></li>
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