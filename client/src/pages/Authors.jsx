import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

import profilePic from '../images/avatar.png'
import axiosInstance from '../utils/axios';
const Authors = () => {
  const [authors,setAuthors]=useState('');
  const [isLoading,setIsLoading]=useState(false);

  useEffect(()=>{
    const getAuthor=async()=>{
      setIsLoading(true);
      try {
        const response= await axiosInstance.get(`/users`);
        setAuthors(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    getAuthor();
  },[])

  if(isLoading){
    return <Loader/>
  }

  return (
    <section className="authors">
      {authors.length > 0 ?   <div className="container authors_container">
        {
          authors.map(({_id: id,avatar,name,posts})=>{
            return <Link key={id} to={`/posts/users/${id}`} className='author'>
              <div className="author_avatar">
                <img src={avatar || profilePic} alt={`Image of ${name}`} />
              </div>
              <div className="author_info">
                <h4>{name}</h4>
                <p>{posts} Posts</p>
              </div>
            </Link>
          })
        }
      </div> : <h2>No users/authors found.</h2>}
    </section>
  )
}

export default Authors