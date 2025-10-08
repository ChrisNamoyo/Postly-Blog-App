import React, { useContext, useEffect, useState } from 'react'
import './Authors.css'
import Author from '../../components/Author/Author'
import { storeContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Authors() {
  const {base_url} = useContext(storeContext)
  const [authorsData, setAuthorsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchPost = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${base_url}/api/user`)
      const data = response.data
      setAuthorsData(data.authors)
    } catch (err) {
      console.log(err)
      toast("Network or server error.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  if(isLoading) {
    return <h2 className='center'>Loading...</h2>
  }
  return (
     <section className='authors'>
      {authorsData.length > 0 ?
        <div className='authors-container'>
          {authorsData.map((author, index) => {
            if(author.posts) {
              return (
                <Author
                  key={index}
                  id={author._id}
                  avatar={author.avatar}
                  name={author.name}
                  posts={author.posts}
                />
              )
            }
          })}
        </div>
       : 
        <h2 className='center'>No Authors Available.</h2>
      }
    </section>
  )
}

export default Authors