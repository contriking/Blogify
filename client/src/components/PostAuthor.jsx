import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import profilePic from '../images/avatar.png'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const PostAuthor = ({authorID,createdAt}) => {

  const [author,setAuthor]=useState({});

  useEffect(()=>{
    const getAuthor= async()=>{
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${authorID}`);
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAuthor();
  })

  return (
    <Link to={`/posts/users/${authorID}`} className='post_author'>
        <div className="post_author-avatar">
            {/* <img src={`${process.env.VITE_APP_ASSETS_URL}/uploads/${author.avatar}`} alt="" /> */}
            {author.avatar!==undefined ? <img src={ `${process.env.VITE_APP_ASSETS_URL}/uploads/${author.avatar}`} alt=""/> : <img src={profilePic } alt="" /> }
        </div>
        <div className="post_author-details">
            <h5>By: {author?.name}</h5>
            <small><ReactTimeAgo date={new Date(createdAt)} locale='en-in'/></small>
        </div>
    </Link>
  )
}

export default PostAuthor