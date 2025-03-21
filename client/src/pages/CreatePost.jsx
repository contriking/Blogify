import React, { useState , useEffect , useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import Loader from '../components/Loader';
import axiosInstance from '../utils/axios';
import { toast } from 'react-toastify';
import { UserContext } from '../context/userContext';

const CreatePost = () => {
  const [title,setTitle]=useState('');
  const [category,setCategory]=useState('Uncategorized');
  const [description,setDescription]=useState('');
  const [thumbnail,setThumbnail]=useState('');
  const [isLoading,setIsLoading]=useState(false);

  const [error,setError] = useState('');

  const { currUser } = useContext(UserContext);
  const token = currUser?.token;
  const navigate = useNavigate(); 

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

  const thumbnailHandler=(e)=>{
    
    const file=e.target.files[0];
    if(!file){
      return ;
    }
    
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=async()=>{
      const base64Image=reader.result;
      setThumbnail(base64Image);
    }
  }

  const createPost= async (e)=>{
    e.preventDefault();

    const postData= new FormData();
    postData.set('title',title)
    postData.set('category',category)
    postData.set('description',description)
    postData.set('thumbnail',thumbnail)

    try {
      setIsLoading(true);
      const response= await axiosInstance.post(
        `/posts`,
        {
          'title':title,
          'category':category,
          'description':description,
          'thumbnail':thumbnail
        } ,
        {withCredentials: true , headers: { Authorization: `Bearer ${token}`}}
      )
      toast.success("Post created sucessfully.")
      if(response.status == 201){
        return navigate('/');
      }
    } catch (err) {
      setError(err.response.data.message);
    }
    finally{
      setIsLoading(false);
    }
  }

  if(isLoading){
    return <Loader/>
  }

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <div className="form_error-message">{error}</div>}
        <form className="form create-post_form" onSubmit={createPost}>
          <input placeholder='Title' value={title}  onChange={e=> setTitle(e.target.value)} 
           autoFocus/>
          <select name="category" value={category} onChange={e=> setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <ReactQuill modules={module} formats={formats} value={description} onChange={setDescription}/>
          <input type="file" onChange={thumbnailHandler} accept='png jpg jpeg'/>
          <button type='submit' className='btn primary'>Create</button>
          </form>
      </div>
    </section>
  )
}

export default CreatePost