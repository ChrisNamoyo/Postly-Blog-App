import React, { useContext, useEffect, useState } from 'react'
import './AuthorPosts.css'
import Post from '../../components/Post/Post'
import { storeContext } from '../../context/StoreContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function AuthorPosts() {
  const {base_url} = useContext(storeContext)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {id} = useParams()
  
  const fetchPost = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${base_url}/api/post/users/${id}`)
      const data = response.data
      setPosts(data.posts)
    } catch (err) {
      console.log(err)
      toast("Network or server error")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [id])

  if(isLoading) {
    return <h2 className='center'>Loading...</h2>
  }

  return (
    <section className='author-posts'>
      {posts.length ? 
        <>
          <h2>{posts[0].creator.name} posts👇</h2>
          <div className='posts-display-list'>
              {posts.map((post) => {
                return (
                  <Post 
                  key={post._id}
                    id={post._id}
                    thumbnail={post.thumbnail}
                    title={post.title}
                    description={post.description}
                    category={post.category}
                    createdAt={post.createdAt}
                    creator={post.creator}
                    />
                  )
              })}
          </div>
        </>
        :
        <h2 className='center'>No Posts Available</h2>
      }  
    </section>
  )
}

export default AuthorPosts