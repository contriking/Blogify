import React from 'react'
import { useState , useEffect }  from 'react';
import PostItem from '../components/PostItem';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axios';

const CategoryPost = () => {
  const [posts,setPosts]=useState([]);
  const [isLoading,setIsLoading]=useState(false);

  const {category}=useParams();

  useEffect(()=>{
    const  fetchPosts=async()=>{
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/posts/categories/${category}`);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    fetchPosts();
  },[category])

  if(isLoading){
    return <Loader/>
  }

return (
  <section className='posts'>
      {posts.length > 0 ? <div className="container posts_container">
          {posts.map(({_id: id,thumbnail,category,title,description,creator, createdAt}) =>
               <PostItem 
                  key={id} 
                  postID={id} 
                  thumbnail={thumbnail} 
                  category={category} 
                  title={title} 
                  description={description} 
                  authorID={creator} 
                  createdAt={createdAt} 
                />)
          }
      </div> : <h2 className='center'>No Posts found</h2> }
  </section>
)
}

export default CategoryPost