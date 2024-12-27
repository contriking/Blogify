import React, { useState } from 'react'

import PostItem from './PostItem';

import thumbnail1 from '../images/blog1.jpg';
import thumbnail2 from '../images/blog2.jpg';
import thumbnail3 from '../images/blog3.jpg';
import thumbnail4 from '../images/blog4.jpg';

import {DUMMY_POSTS} from '../data.js';

const Posts = () => {
    const [posts,setPosts]=useState(DUMMY_POSTS);
  return (
    <section className='posts'>
        {posts.length > 0 ? <div className="container posts_container">
            {posts.map(({id,thumbnail,category,title,description,authorID}) =>
                 <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} 
                    description={description} authorID={authorID} />)
            }
        </div> : <h2 className='center'>No Posts found</h2> }
    </section>
  )
}

export default Posts