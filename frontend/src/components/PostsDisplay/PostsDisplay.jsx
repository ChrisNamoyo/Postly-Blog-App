import React, { useContext, useEffect, useState } from 'react'
import './PostsDisplay.css'
import Post from '../Post/Post'
import { storeContext } from '../../context/StoreContext'
import axios from 'axios'

function PostsDisplay({category}) {
    const {base_url} = useContext(storeContext)
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false) 

    const fetchPost = async () => {
        setIsLoading(true)
        try {
            const {data} = await axios.get(`${base_url}/api/post`)
            console.log(data)
            setPosts(data.posts)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPost()
    }, [])

    const filteredPosts = posts?.filter(post => category === "All" || post.category === category)

    if(isLoading) return <h2>Loading posts...</h2>
    if(!posts.length) return <h2 className='center'>No posts available</h2>
    if(!filteredPosts.length) return <h2 className='center'>No posts found for {category}</h2>

  return (
    <section className='post-display-section'>
        <div className='posts-display'>
            <h2>Available Posts</h2>
            <div className="posts-display-list">
                {filteredPosts.map((post) => {
                    return (
                        <Post
                            key={post._id}
                            id={post._id}
                            thumbnail={post.imageUrl}
                            title={post.title}
                            category={post.category}
                            description={post.description}
                            createdAt={post.createdAt}
                            creator={post.creator}
                        />
                    )
                })}
            </div>
        </div>
    </section>
  )
}

export default PostsDisplay