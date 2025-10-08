import React, { useContext, useEffect, useState } from 'react'
import './CategoryPost.css'
import Post from '../../components/Post/Post'
import { storeContext } from '../../context/StoreContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function CategoryPost() {
  const {base_url} = useContext(storeContext)
  const {category} = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])

  const fetchPost = async () => {
    setIsLoading(true)
    try {
      const {data} = await axios.get(`${base_url}/api/post/categories/${category}`)
      setPosts(data.posts)
    } catch (err) {
      console.log(err)
      toast("Netork or server error")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [category])

  if(isLoading) {
    return <h2 className='center'>Loading...</h2>
  }

  return (
    <section>
      {posts.length > 0 ?
        <div className='posts-display-list'>
          {posts.map(post => (
            <Post 
              key={post._id}
              id={post._id}
              thumbnail={post.thumbnail}
              category={post.category}
              description={post.description}
              title={post.title}
              createdAt={post.createdAt}
              creator={post.creator}
            />
          ))}
        </div>
        :
        <h2 className='center'>No Posts Available.</h2>
      }
    </section>
  )
}

export default CategoryPost