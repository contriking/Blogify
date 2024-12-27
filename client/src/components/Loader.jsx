import React from 'react'
import loaderGif from '../images/loader.gif'

const Loader = () => {
  return (
    <div className='loader'>
        <div className="loader_image">
            <img src={loaderGif} alt="" />
        </div>
    </div>
  )
}

export default Loader