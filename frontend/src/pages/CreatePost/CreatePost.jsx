import React, { useContext, useState } from 'react'
import './CreatePost.css'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import { storeContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false]}],
        ['bold', 'italic', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ]
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

const postCategories = ["Farming", "Business", "Education", "Lifestyle", "Art", "Tech", "Health", "Politics", "Sports", "Uncategorized"]

function CreatePost() {
    const {base_url, token} = useContext(storeContext)
    const [isLoading, setIsLoading] = useState(false)
    const [thumbnail, setThumbnail] = useState(null)
    const {currentUser} = useContext(storeContext)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Uncategorized"
    })
    const navigate = useNavigate()

    const handleFormChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name] : e.target.value}))
    }

    const handleFileChange = (e) => {
        setThumbnail(e.target.files[0])
    }

    const createPost = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        const postData = new FormData()
        postData.append("title", formData.title)
        postData.append("category", formData.category)
        postData.append("description", formData.description)
        postData.append("thumbnail", thumbnail)

        try {
            const {data} = await axios.post(`${base_url}/api/post`, postData, {headers: {token}})
            if(data.success) {
                toast(data.message || "Post Created")
                setFormData({
                    title: "",
                    description: "",
                    category: "Uncategorized"
                })
                setThumbnail(null)
                navigate(`/user-posts/${currentUser._id}`)
            } else {
                setError(data.message)
            }
        } catch (err) {
            console.log(err)
            toast("Network or server error")
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <section className='create-post'>
        <form className='create-post-form' onSubmit={createPost}>
            <h2>Create Post</h2>
            {error && <p className='error'>{error}</p>}
            <input 
                type="text" 
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
            />
            <select name="category" value={formData.category} onChange={handleFormChange}>
                {postCategories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
            <ReactQuill 
                modules={modules} 
                formats={formats}
                name="description"
                value={formData.description}
                onChange={(value) => setFormData(prev => ({...prev, description: value}))}
            />
            <input 
                type="file"
                name="thumbnail"
                onChange={handleFileChange}
            />
            <button type="submit" className='btn'>{isLoading ? "Posting..." : "Create"}</button>
        </form>
    </section>
  )
}

export default CreatePost