import React  , {useContext , useEffect , useState} from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import DeletePost from "./DeletePost";
import Loader from "../components/Loader";
import axios from "axios";

const PostDetail=()=>{
    const {id} = useParams();
    const [post,setPost]=useState(null);
    const [error,setError]=useState(null);
    const [isLoading,setIsLoading]=useState(false);

    const { currUser } = useContext(UserContext);

    useEffect(()=>{
        const getPost= async()=>{
            setIsLoading(true);
            try {
                const response= await axios.get(`${process.env.VITE_APP_BASE_URL}/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.log(error);
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
                    <img src={`${process.env.VITE_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
                </div>
                <p dangerouslySetInnerHTML={{__html: post.description}}></p>
            </div>}
        </section>
    )
}

export default PostDetail