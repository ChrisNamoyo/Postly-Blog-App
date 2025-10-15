import React, { useContext, useEffect, useState } from 'react'
import './EditPost.css'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { storeContext } from '../../context/StoreContext'

const modules = {
	toolbar: [
		[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
		['bold', 'italic', 'strike', 'blockquote'],
		[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
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

function EditPost() {
	const [title, setTitle] = useState('')
	const [category, setCategory] = useState('')
	const [description, setDescription] = useState('')
	const [thumbnail, setThumbnail] = useState('')
	const [post, setPost] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const { id } = useParams()
	const { base_url, token } = useContext(storeContext)
	const navigate = useNavigate()

	const fetchPost = async () => {
		setIsLoading(true)
		try {
			const { data } = await axios.get(`${base_url}/api/post/${id}`)
			setPost(data.post)
			setTitle(data.post.title)
			setCategory(data.post.category)
			setDescription(data.post.description)
		} catch (err) {
			console.log(err)
			toast(data.message || "Network or server error")
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchPost()
	}, [])

	const editPost = async (e) => {
		setIsEditing(true)
		e.preventDefault()
		const formData = new FormData()

		formData.set("title", title)
		formData.set("category", category)
		formData.set("description", description)
		if (thumbnail) formData.set("thumbnail", thumbnail)

		try {
			const { data } = await axios.patch(`${base_url}/api/post/${id}`, formData, { headers: { token } })
			if (!data.success) {
				toast(data.message)
			} else {
				toast(data.message)
				navigate(`/user-posts/${post?.creator?._id}`)
			}
		} catch (err) {
			console.log(err)
			toast("Network or server error")
		} finally {
			setIsEditing(false)
		}
	}

	if(isLoading) {
		return <h2 className='center'>Loading...</h2>
	}

	return (
		<section className='create-post'>
			<form className='create-post-form' onSubmit={editPost}>
				<h2>Edit Post</h2>
				<input
					type="text"
					placeholder='Title'
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<select name="category" value={category} onChange={e => setCategory(e.target.value)}>
					{postCategories.map(cat => <option key={cat}>{cat}</option>)}
				</select>
				<ReactQuill
					modules={modules}
					formats={formats}
					value={description}
					onChange={(value) => setDescription(value)}
				/>
				<input
					type="file"
					onChange={e => setThumbnail(e.target.files[0])}
					accept='png, jpg, jpeg'
				/>
				<button type="submit" className='btn' disabled={isEditing}>
					{isEditing ? "Editing..." : "Edit"}
				</button>
			</form>
		</section>
	)
}

export default EditPost