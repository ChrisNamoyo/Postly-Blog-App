import React, { useContext, useEffect, useState } from 'react'
import './PostDetail.css'
import { useParams, Link } from 'react-router-dom'
import { storeContext } from '../../context/StoreContext'
import axios from 'axios'
import DOMPurify from 'dompurify'
import PostAuthor from '../../components/PostAuthor/PostAuthor'
import DeletePost from '../../components/DeletePost/DeletePost'

function PostDetail() {
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const {base_url, currentUser} = useContext(storeContext)
  const {id} = useParams()
  
  const fetchPost = async () => {
    setIsLoading(true)
    try {
      const {data} = await axios.get(`${base_url}/api/post/${id}`)
      setPost(data.post)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [id])

  if(isLoading) return <h2>Loading post...</h2>
  if(!post) return <h2>Post not found</h2>

  return (
    <section className='post-detail'>
      <div className='post-detail-header'>
        <PostAuthor 
          createdAt={post.createdAt}
          creator={post.creator}
        />
        {currentUser &&currentUser._id === post.creator._id && 
          <div className='post-detail-header-btn'>
            <Link to={`/post/${post?._id}/edit`} className='btn edit'>Edit</Link>
            <DeletePost />
          </div>
        }
      </div>
      <div className='post-detail-thumbnail'>
          <img src={post?.imageUrl} alt="" width={"100%"}/>
      </div>
      <h4>{post?.title}</h4>
      <div className='blog-content' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post?.description)}}></div>
    </section>
  )
}

export default PostDetail