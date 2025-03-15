import React, { useState , useEffect , useContext } from 'react'
import DeletePost from './DeletePost.jsx'
import { Link , useNavigate , useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext'; 

import axios from 'axios';
import Loader from '../components/Loader.jsx'

const DashBoard = () => {
  const [posts,setPosts]=useState([]);
  const [isLoading,setIsLoading]=useState(false);

  const { currUser } = useContext(UserContext);
  const token = currUser?.token;
  
  const navigate = useNavigate(); 
  // const {id}=useParams();

  useEffect(()=>{
    if(!token){
      navigate('/login');
    }
  },[])


  useEffect(()=>{
    const fetchPosts= async ()=>{
      setIsLoading(true);
      try {
        const response=await axios.get(`http://localhost:5000/api/posts/users/${currUser.id}`,
          {withCredentials : true , headers: {Authorization : `Bearer ${token}`}});
        setPosts(response.data)
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false)
    }
    fetchPosts();
  },[currUser.id])

  if(isLoading){
    return <Loader/>
  }


  return (
    <section className='dashboard'>
      {posts.length > 0 ? <div className="container dashboard_container">
        {
          posts.map(post=>{
            return <article key={post._id} className='dashboard_post'>
              <div className="dashboard_post-info">
                <div className="dashboard_post-thumbnail">
                  <img src={`${process.env.VITE_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="Author Photo" />
                </div>
                <h5>{post.title}</h5>
              </div>
              
              <div className="dashboard_post-actions">
                <Link to={`/posts/${post._id}`} className="btn sm ">View</Link>
                <Link to={`/posts/${post._id}/edit`} className="btn sm primary">Edit</Link>
                <DeletePost postId={post._id}/>
              </div>
            </article>
          })
        }
      </div> : <h2 className='center'>You have no Posts yet.</h2>}
    </section>
  )
}

export default DashBoard