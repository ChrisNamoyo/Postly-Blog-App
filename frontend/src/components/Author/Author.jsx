import './Author.css'
import { Link } from 'react-router-dom'

function Author({avatarUrl, name, posts, id}) {
  return (
    <>
        <div className='author-container'>
            <div className="author-info">
                <img src={avatarUrl} alt="" />
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