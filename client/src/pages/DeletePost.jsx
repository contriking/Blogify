import React , { useEffect , useContext, useState } from 'react'
import { Link, useNavigate , useLocation } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import Loader from '../components/Loader'
import axiosInstance from '../utils/axios'

const DeletePost = ({postId : id}) => {
  const [isLoading,setIsLoading]=useState(false);
  const { currUser } = useContext(UserContext);
  const token = currUser?.token;
  const navigate = useNavigate(); 
  const location=useLocation();
  
  useEffect(()=>{
    if(!token){
      navigate('/login');
      }
    },[])

    const removePost =async()=>{
      try {
        setIsLoading(true)
        const response = await axiosInstance.delete(`/posts/${id}`,
          {withCredentials:true, headers : { Authorization : `Bearer ${token}`}
        })

        if(response.status == 200){
          if(location.pathname == `/myposts/${currUser.id}`){
            navigate(0);
          }
          else{
            navigate('/');
          }
        }
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    }

    if(isLoading){
      return <Loader/>
    }

  return (
    <Link className='btn sm danger' onClick={()=> removePost(id)}>Delete</Link>
  )
}

export default DeletePost