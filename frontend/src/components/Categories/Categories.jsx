import React from 'react'
import './Categories.css'
import { categories_list } from '../../assets/assets'

function Categories({category, setCategory}) {
  return (
    <div className='categories-container' id='categories'>
        <h2>Explore our categories</h2>
        <p className='categories-intro-text'>Discover articles tailored to your interests. Choose a category to dive into the topics you care about most.</p>
        <div className="categories-list">
          {categories_list.map((cat, index) => (
            <div 
              key={index} 
              className='categories-list-item' 
              onClick={() => category === cat.name ? setCategory("All") : setCategory(cat.name)}
            >
              <div className="category-img-wrapper">
                <img src={cat.image} alt=""/>
              </div>
              <p className={category === cat.name ? "active-p" : ""}>{cat.name}</p>
            </div>
          ))}
        </div>
        <hr />
    </div>
  )
}

export default Categories