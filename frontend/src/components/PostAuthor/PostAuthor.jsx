import React, { useContext } from 'react'
import './PostAuthor.css'
import { Link } from 'react-router-dom'
import { storeContext } from '../../context/StoreContext'
import { formatDistanceToNow } from 'date-fns'

function PostAuthor({createdAt, creator}) {
  const {base_url} = useContext(storeContext)

  return (
    <Link to={`/posts/users/${creator?._id}`}>
        <div className='post-author'>
            <div className="post-author-img">
              <img src={`${base_url}/images/${creator.avatar}`}/>
            </div>
            <div className="post-author-info">
                <h6>{creator.name}</h6>
                <small>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</small>
            </div>
        </div>
    </Link>
  )
}

export default PostAuthor