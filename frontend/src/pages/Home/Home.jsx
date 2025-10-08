import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Categories from '../../components/Categories/Categories'
import PostsDisplay from '../../components/PostsDisplay/PostsDisplay'

function Home() {
  const [category, setCategory] = useState("All")

  return (
    <div>
      <Header />
      <Categories category={category} setCategory={setCategory}/>
      <PostsDisplay category={category}/>
    </div>
  )
}

export default Home