import React, { useContext, useEffect, useState } from 'react'
import './Dashboard.css'
import { Link, useParams } from 'react-router-dom'
import { storeContext } from '../../context/StoreContext'
import axios from 'axios'
import DeletePost from '../../components/DeletePost/DeletePost'

function Dashboard() {
  const {id} = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const {base_url} = useContext(storeContext)

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      const {data} = await axios.get(`${base_url}/api/post/users/${id}`)
      setPosts(data.posts)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [id])

  if(isLoading) return <h2 className='center'>Loading</h2>
  if(!posts.length) return <h2 className='center'>You've No posts.</h2>

  return (
    <section className='dashboard'>
      {posts.map(post => (
        <article className="dashboard-post" key={post._id}>
          <div className="dashboard-post-details">
            <div className="dashboard-post-thumbnail">
              <img src={post.imageUrl}/>
            </div>
            <h5>
              {post.title.length > 40 ? 
                post.title.slice(0, 40) + "..."
                :
                post.title
              }
            </h5>
          </div>
          <div className="dashboard-post-actions">
            <Link to={`/post/${post._id}`} className='view btn'>View</Link>
            <Link to={`/post/${post._id}/edit`} className='edit btn'>Edit</Link>
            <DeletePost 
              postId={post._id}
              onDeleteSuccess={fetchPosts}
            />
          </div>
        </article>
      ))}
    </section>
  )
}

export default Dashboard