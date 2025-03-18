import React, { useState , useEffect , useContext } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

import { useNavigate , useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axiosInstance from '../utils/axios';
import { toast } from 'react-toastify';
const EditPost = () => {
  const [title,setTitle]=useState('');
  const [category,setCategory]=useState('Uncategorized');
  const [description,setDescription]=useState('');
  const [thumbnail,setThumbnail]=useState('');
  const [error,setError]=useState('')

  const { currUser } = useContext(UserContext);
  const token = currUser?.token;

  const navigate = useNavigate();
  const {id}=useParams()

  useEffect(()=>{
    if(!token){
      navigate('/login');
    }
  },[])

  const module={
    toolbar:[
      [{'header': [1,2,3,4,5,6,false]}],
      ['bold','italic','underline','strike','blockquote'],
      [{'list': 'ordered'},{'list':'bullet'},{'indent':'-1'},{'indent':'+1'}],
      ['link','image'],
      ['clean']
    ],
  }

  const formats=[
    "header",
    "bold",'italic','underline','strike','blockquote',
    'list','bullet','indent',
    'link','image'
  ]

  const POST_CATEGORIES = ["Agriculture" , "Business" , "Education" , "Entertainment" , "Art" , "Investment",
    "Uncategorized", "Weather"
  ]

  useEffect(()=>{
    const getPost= async ()=>{
      try {
        setError('')
        const response= await axiosInstance.get(`/posts/${id}`);
        setTitle(response.data.title)
        setDescription(response.data.description)
      } catch (err) {
        setError(err.response.data.message);
      }  
    }
    getPost();
  },[])

  const handleThumbnail=(e)=>{

    const file=e.target.files[0];
    if(!file){
      return;
    }

    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=async()=>{
      const base64Image=reader.result;
      setThumbnail(base64Image);
    }

  }


  const editPost=async(e)=>{
    e.preventDefault();

    const postData= new FormData();
    postData.set('title',title)
    postData.set('category',category)
    postData.set('description',description)
    postData.set('thumbnail',thumbnail)

    try {
      
      const val=toast.loading("Please wait...");
      setError('');
      
      const response= await axiosInstance.patch(
        `/posts/${id}`,
        {
          'title':title,
          'category':category,
          'description':description,
          'thumbnail':thumbnail
        } ,
        {withCredentials: true , headers: { Authorization: `Bearer ${token}`}}
      )
      .then(res=>{
        toast.update(val,{render:"Post updated.",type:"success",isLoading:false,autoClose:2000})
        if(res.status == 200){
          return navigate('/');
        }
      })
      .catch(err=>{
        toast.update(val,{render:err.response.data.message,type:"error",isLoading:false,autoClose:2000})
      })

    } catch (err) {
      setError(err.response.data.message);
    }

  }


  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
         {error && <div className="form_error-message">{error}</div>}
        <form className="form create-post_form" onSubmit={editPost}>
          <input placeholder='Title' value={title}  onChange={e=> setTitle(e.target.value)} 
           autoFocus/>
          <select name="category" value={category} onChange={e=> setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <ReactQuill modules={module} formats={formats} value={description} onChange={setDescription}/>
          <input type="file" onChange={handleThumbnail} accept='png jpg jpeg'/>
          <button type='submit' className='btn primary'>Update</button>
          </form>
      </div>
    </section>
  )
}

export default EditPost