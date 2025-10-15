import './Post.css'
import { Link } from 'react-router-dom'
import PostAuthor from '../PostAuthor/PostAuthor'
import DOMPurify from 'dompurify'

function Post({thumbnail, title, description, category, id, createdAt, creator}) {
  const shortDescription = 
    description.length > 145 ? description.slice(0, 145) + "..." : description
  const shortTitle = 
    title.length > 30 ? title.slice(0, 30) + "..." : title

  return (
      <div className='post'>
        <div className="post-img-container">
          <img src={thumbnail} alt="" />
        </div>
        <div className='post-details'>
          <Link to={`/post/${id}`}>
            <h4>{shortTitle}</h4>
          </Link>
          <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(shortDescription)}}></p>
          <div className='post-author-wrapper'>
            <PostAuthor 
              createdAt={createdAt}
              creator={creator}
              />
            <Link to={`/posts/categories/${category}`} className='btn cat'>{category}</Link>
          </div>
        </div>
      </div>
  )
}

export default Post