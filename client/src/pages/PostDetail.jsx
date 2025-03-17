import React  , {useContext , useEffect , useState} from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";

import { UserContext } from "../context/userContext";
import DeletePost from "./DeletePost";
import Loader from "../components/Loader";
import axiosInstance from "../utils/axios";

const PostDetail=()=>{
    const {id} = useParams();
    const [post,setPost]=useState(null);
    const [error,setError]=useState(null);
    const [isLoading,setIsLoading]=useState(false);

    const { currUser } = useContext(UserContext);

    useEffect(()=>{
        const getPost= async()=>{
            setError('');
            setIsLoading(true);
            try {
                const response= await axiosInstance.get(`/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                setError(error.response.data.message);
            }
            setIsLoading(false);
        }
        getPost();
    },[])

    if(isLoading){
        return <Loader/>
    }

    return (
        <section className="post-detail" >
            {error && <p className='error'>{error}</p>}
            {post && <div className="container post-detail_container">
                <div className="post-detail_header">
                    <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
                    {currUser?.id == post?.creator && <div className="post-detail_buttons">
                        <Link to={`/posts/${post?._id}/edit`} className="btn sm primary">Edit</Link>
                        <DeletePost postId={id}/>
                    </div>}
                </div>
                <h1>{post.title}</h1>
                <div className="post-detail_thumbnail">
                    <img src={post.thumbnail} alt="" />
                </div>
                <p dangerouslySetInnerHTML={{__html: post.description}}></p>
            </div>}
        </section>
    )
}

export default PostDetail