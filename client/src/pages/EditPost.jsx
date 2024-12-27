import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const EditPost = () => {
  const [title,setTitle]=useState('');
  const [category,setCategory]=useState('Uncategorized');
  const [description,setDescription]=useState('');
  const [thumbnail,setThumbnail]=useState('');

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
    "Uncategorized", "Weather"]

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        <div className="form_error-message">
          This is an error message
        </div>
        <form className="form create-post_form">
          <input placeholder='Title' value={title}  onChange={e=> setTitle(e.target.value)} 
           autoFocus/>
          <select name="category" value={category} onChange={e=> setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <ReactQuill modules={module} formats={formats} value={description} onChange={setDescription}/>
          <input type="file" onChange={e=> setThumbnail(e.target.value)} accept='png jpg jpeg'/>
          <button type='submit' className='btn primary'>Update</button>
          </form>
      </div>
    </section>
  )
}

export default EditPost