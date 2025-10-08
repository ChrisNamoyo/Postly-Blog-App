import React, { useContext } from 'react'
import './Author.css'
import { Link } from 'react-router-dom'
import { storeContext } from '../../context/StoreContext'

function Author({avatar, name, posts, id}) {
  const {base_url} = useContext(storeContext)
  
  return (
    <>
        <div className='author-container'>
            <div className="author-info">
                <img src={`${base_url}/images/${avatar}`} alt="" />
                <div className="author-details">
                    <h5>{name}</h5>
                    <p>{`${posts} posts`}</p>
                </div>
            </div>
            <Link to={`/posts/users/${id}`} className='btn author-btn'>View Posts</Link>
        </div>
        <hr />
    </>
  )
}

export default Author